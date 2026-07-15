import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qmmwszpukbyalhrtpoea.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtbXdzenB1a2J5YWxocnRwb2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4NTIwMjYsImV4cCI6MjA5OTQyODAyNn0.BFaoWE42xXVHkRENUfTQHTRRkCYYG1IjzfsM4srSru4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface AppConfig {
  mainLogo?: string;
  partnerLogos?: Record<string, string>;
  projectImages?: Record<string, string[]>;
  serviceImages?: Record<number, string>;
  teamImages?: string[];
  aboutHeroImage?: string;
}

// Optimized client-side image compression for maximum speed and small payloads
export function compressDataUrl(dataUrl: string, maxW = 700, maxH = 700, quality = 0.55): Promise<string> {
  return new Promise((resolve) => {
    if (!dataUrl || !dataUrl.startsWith('data:image/')) {
      resolve(dataUrl);
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions while maintaining aspect ratio
      if (width > maxW || height > maxH) {
        if (width > height) {
          height = Math.round((height * maxW) / width);
          width = maxW;
        } else {
          width = Math.round((width * maxH) / height);
          height = maxH;
        }
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Keep transparency for PNGs, otherwise compress as JPEG with lower quality for maximum weight savings
      const isPng = dataUrl.startsWith('data:image/png');
      const compressed = isPng ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', quality);
      resolve(compressed);
    };
    img.onerror = () => {
      resolve(dataUrl);
    };
    img.src = dataUrl;
  });
}

export async function uploadImage(path: string, dataUrl: string): Promise<string> {
  try {
    const optimized = await compressDataUrl(dataUrl);
    return optimized;
  } catch (err) {
    console.warn("Client-side image compression failed, falling back to original:", err);
    return dataUrl;
  }
}

export async function getGlobalConfig(): Promise<AppConfig | null> {
  try {
    const { data, error } = await supabase
      .from('app_config')
      .select('*');
    
    if (error) {
      console.warn("Supabase fetch failed (table might not exist yet):", error.message);
      // Fallback to local storage cache
      const cached = localStorage.getItem('dibe_app_config');
      return cached ? JSON.parse(cached) : null;
    }

    const config: AppConfig = {};
    const partnerMap: Record<string, string> = {};
    const projectMap: Record<string, string[]> = {};
    const serviceMap: Record<number, string> = {};
    const teamArr: string[] = [];

    for (const row of (data || [])) {
      const id: string = row.id;
      const dataUrl: string = row.value?.dataUrl;
      if (!dataUrl) continue;

      if (id === 'main_logo') {
        config.mainLogo = dataUrl;
      } else if (id.startsWith('partner_logo_')) {
        const acronym = id.substring('partner_logo_'.length);
        partnerMap[acronym] = dataUrl;
      } else if (id.startsWith('project_image_')) {
        const parts = id.substring('project_image_'.length).split('_');
        const projectId = parts[0];
        const idx = parseInt(parts[1], 10);
        if (!projectMap[projectId]) projectMap[projectId] = [];
        projectMap[projectId][idx] = dataUrl;
      } else if (id.startsWith('service_image_')) {
        const idx = parseInt(id.substring('service_image_'.length), 10);
        serviceMap[idx] = dataUrl;
      } else if (id.startsWith('team_image_')) {
        const idx = parseInt(id.substring('team_image_'.length), 10);
        teamArr[idx] = dataUrl;
      } else if (id === 'about_hero_image') {
        config.aboutHeroImage = dataUrl;
      }
    }

    if (Object.keys(partnerMap).length > 0) {
      config.partnerLogos = partnerMap;
    }
    if (Object.keys(projectMap).length > 0) {
      config.projectImages = projectMap;
    }
    if (Object.keys(serviceMap).length > 0) {
      config.serviceImages = serviceMap;
    }
    if (teamArr.length > 0) {
      config.teamImages = teamArr;
    }

    // Save/update local cache
    try {
      localStorage.setItem('dibe_app_config', JSON.stringify(config));
    } catch (cacheError) {
      console.warn("Failed to write global config to localStorage (quota may be exceeded):", cacheError);
    }
    return config;
  } catch (e) {
    console.error("Error in getGlobalConfig:", e);
    try {
      const cached = localStorage.getItem('dibe_app_config');
      return cached ? JSON.parse(cached) : null;
    } catch (readError) {
      return null;
    }
  }
}

export async function updateGlobalConfig(updates: Partial<AppConfig>) {
  // 1. Optimistically update local cache instantly so UI is lag-free
  try {
    const cached = localStorage.getItem('dibe_app_config');
    const current: AppConfig = cached ? JSON.parse(cached) : {};
    
    // Merge nested objects properly
    const merged: AppConfig = {
      ...current,
      mainLogo: updates.mainLogo !== undefined ? updates.mainLogo : current.mainLogo,
      partnerLogos: updates.partnerLogos !== undefined ? { ...current.partnerLogos, ...updates.partnerLogos } : current.partnerLogos,
      projectImages: updates.projectImages !== undefined ? { ...current.projectImages, ...updates.projectImages } : current.projectImages,
      serviceImages: updates.serviceImages !== undefined ? { ...current.serviceImages, ...updates.serviceImages } : current.serviceImages,
      teamImages: updates.teamImages !== undefined ? updates.teamImages : current.teamImages,
      aboutHeroImage: updates.aboutHeroImage !== undefined ? updates.aboutHeroImage : current.aboutHeroImage,
    };
    
    localStorage.setItem('dibe_app_config', JSON.stringify(merged));
  } catch (e) {
    console.error("Local storage cache write failed:", e);
  }

  // 2. Perform remote write to Supabase
  try {
    const upserts: Array<{ id: string; value: { dataUrl: string } }> = [];

    if (updates.mainLogo !== undefined) {
      upserts.push({ id: 'main_logo', value: { dataUrl: updates.mainLogo } });
    }

    if (updates.partnerLogos !== undefined) {
      for (const [acronym, dataUrl] of Object.entries(updates.partnerLogos)) {
        if (dataUrl) {
          upserts.push({ id: `partner_logo_${acronym}`, value: { dataUrl } });
        }
      }
    }

    if (updates.projectImages !== undefined) {
      for (const [projectId, images] of Object.entries(updates.projectImages)) {
        for (let i = 0; i < images.length; i++) {
          if (images[i]) {
            upserts.push({ id: `project_image_${projectId}_${i}`, value: { dataUrl: images[i] } });
          }
        }
      }
    }

    if (updates.serviceImages !== undefined) {
      for (const [idx, dataUrl] of Object.entries(updates.serviceImages)) {
        if (dataUrl) {
          upserts.push({ id: `service_image_${idx}`, value: { dataUrl } });
        }
      }
    }

    if (updates.teamImages !== undefined) {
      for (let i = 0; i < updates.teamImages.length; i++) {
        const dataUrl = updates.teamImages[i];
        if (dataUrl) {
          upserts.push({ id: `team_image_${i}`, value: { dataUrl } });
        }
      }
    }

    if (updates.aboutHeroImage !== undefined) {
      upserts.push({ id: 'about_hero_image', value: { dataUrl: updates.aboutHeroImage } });
    }

    if (upserts.length > 0) {
      const { error } = await supabase
        .from('app_config')
        .upsert(upserts);
      
      if (error) {
        console.warn("Supabase upsert failed (table might not exist yet):", error.message);
      }
    }
  } catch (e) {
    console.error("Error in updateGlobalConfig:", e);
  }
}
