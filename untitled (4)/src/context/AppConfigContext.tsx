import React, { createContext, useContext, useEffect, useState } from 'react';
import { getGlobalConfig, AppConfig } from '../lib/supabase';

const AppConfigContext = createContext<AppConfig | null>(null);

export const AppConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Synchronously initialize the configuration state from the local cache so logos/images render instantly
  const [config, setConfig] = useState<AppConfig | null>(() => {
    try {
      const cached = localStorage.getItem('dibe_app_config');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Asynchronously fetch latest changes from Supabase in the background
    getGlobalConfig()
      .then((newConfig) => {
        if (newConfig) {
          setConfig(newConfig);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <AppConfigContext.Provider value={config}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(AppConfigContext);
