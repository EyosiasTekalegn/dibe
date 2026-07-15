// src/pages/Home.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { useAppConfig } from "../context/AppConfigContext";
import { SEO } from "../components/SEO";
import { cn } from "../lib/utils";

// Hero image – use a reliable public URL
const heroWeldingImg =
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80";

export function Home() {
  const config = useAppConfig();
  const [customLogos, setCustomLogos] = useState<Record<string, string>>(
    config?.partnerLogos || {},
  );

  React.useEffect(() => {
    if (config?.partnerLogos) {
      setCustomLogos(config.partnerLogos);
    }
  }, [config]);

  const partners: { name: string; acronym: string; imgUrl: string }[] = [
    {
      name: "Prime Minister's Office",
      acronym: "PMO",
      imgUrl: "/partners/PMO.png",
    },
    {
      name: "Addis Ababa City Administration",
      acronym: "Mayor's Office",
      imgUrl: "/partners/Mayor's Office.png",
    },
    {
      name: "Ethiopian Roads Administration",
      acronym: "ERA",
      imgUrl: "/partners/ERA.png",
    },
    {
      name: "Ethiopian Civil Aviation Authority",
      acronym: "ECAA",
      imgUrl: "/partners/ECAA.png",
    },
    {
      name: "Ethiopian Engineering Corporation",
      acronym: "EEC",
      imgUrl: "/partners/EEC.png",
    },
    {
      name: "Ethiopian Construction Works Corporation",
      acronym: "ECWC",
      imgUrl: "/partners/ECWC.png",
    },
    {
      name: "Ministry of Water and Energy",
      acronym: "MOWE",
      imgUrl: "/partners/MOWE.png",
    },
    {
      name: "Habesha Cement Share Company",
      acronym: "HCSC",
      imgUrl: "/partners/HCSC.png",
    },
  ];

  React.useEffect(() => {
    // Dynamically preload all partner logos and the hero image in the background to ensure instant rendering
    partners.forEach((partner) => {
      const img = new Image();
      img.src = customLogos[partner.acronym] || partner.imgUrl;
    });
    const heroImg = new Image();
    heroImg.src = heroWeldingImg;
  }, [customLogos]);

  return (
    <div className="flex flex-col">
      <SEO title="Dibe Engineering | Excellence in Steelworks and Automation" />
      {/* Hero Section */}
      <section className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center pt-36 pb-36 md:pt-48 md:pb-48 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={heroWeldingImg}
            alt="Welding Hero"
            className="w-full h-full object-cover"
            loading="eager" fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-0"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-start text-left gap-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-white leading-[0.95] tracking-tighter"
          >
            Building <br />
            <span className="text-primary pr-4">Tomorrow.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/70 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl leading-relaxed font-sans"
          >
            We merge heavy‑duty steel fabrication, precision electromechanics,
            and premium architectural aluminum solutions to raise structural standards across East Africa.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              to="/projects"
              className="bg-primary hover:bg-white hover:text-black text-white px-12 py-6 rounded-full text-sm sm:text-base font-extrabold uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-4 shadow-2xl active:scale-95"
            >
              Discover Our Work <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section - Precision & Innovation */}
      <section className="py-28 sm:py-36 md:py-44 bg-light-bg border-b border-black/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-28 items-center">
            <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-8">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
                Who We Are
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black leading-tight tracking-tight">
                Engineering Integrity Built to Last
              </h2>
              <p className="text-text-gray text-base sm:text-lg md:text-xl leading-relaxed font-sans">
                Dibe Engineering stands as a premier force in high-load structural steel fabrication, custom machining, and industrial automation. Based in Addis Ababa, we operate modern facilities featuring certified, state-of-the-art equipment to manufacture robust structures and mechanical components.
              </p>
              <p className="text-text-gray text-base sm:text-lg leading-relaxed font-sans">
                Our legacy lies in our absolute commitment to precision tolerances, thorough non-destructive weld testing, and architectural refinement, earning us the confidence of government ministries, infrastructure developers, and industrial leaders.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6 mt-4">
                <Link
                  to="/services"
                  className="border-2 border-black hover:bg-black hover:text-white text-black px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300"
                >
                  Explore Services
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/3] md:aspect-[16/11] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200"
                  alt="Modern industrial factory floor"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy" decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistical Banner / Achievements */}
      <section className="py-24 sm:py-32 md:py-36 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 to-black z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center max-w-6xl mx-auto">
            <div className="flex flex-col gap-2">
              <span className="text-5xl sm:text-6xl md:text-7xl font-black text-primary tracking-tight">15+</span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white/50">Years of Experience</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-5xl sm:text-6xl md:text-7xl font-black text-primary tracking-tight">120+</span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white/50">Projects Delivered</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-5xl sm:text-6xl md:text-7xl font-black text-primary tracking-tight">100%</span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white/50">Weld NDT Success</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-5xl sm:text-6xl md:text-7xl font-black text-primary tracking-tight">500k+</span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white/50">Tons Steel Engineered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="py-36 sm:py-44 md:py-56 bg-white border-t border-black/5">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-black mb-28 text-center leading-none tracking-tight">
            Trusted <span className="text-primary">By</span>
          </h2>
          {/* Exactly 2 columns on Desktop & Tablet (results in 4 rows for 8 partners), and 1 column on Phone (results in 8 rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 sm:gap-14 md:gap-16 max-w-5xl mx-auto">
            {partners.map((partner) => (
              <div
                key={partner.acronym}
                className="group relative flex flex-col items-center text-center gap-6 sm:gap-8 p-8 sm:p-10 md:p-6 lg:p-8 bg-white border border-gray-100 rounded-[3rem] transition-all duration-300 hover:border-primary/20 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Taller box with responsive heights optimised for phone, tablet, and desktop */}
                <div className="w-full h-72 sm:h-80 md:h-[200px] lg:h-[200px] relative flex items-center justify-center p-8 sm:p-10 md:p-4 lg:p-6 bg-white rounded-[2.5rem] border border-gray-100 group-hover:border-primary/10 transition-colors duration-300 overflow-hidden shadow-sm group-hover:shadow-md">
                  <div className="absolute inset-0 bg-slate-50/5 group-hover:bg-transparent transition-colors duration-300"></div>
                  {/* Huge and fully clear images optimized for phone and larger screens with no black and white filter */}
                  <img
                    src={customLogos[partner.acronym] || partner.imgUrl}
                    alt={partner.name}
                    className="h-full max-h-[180px] sm:max-h-[220px] md:max-h-[140px] lg:max-h-[140px] w-full object-contain transition-all duration-300 group-hover:scale-105"
                    loading="eager" 
                    decoding="sync"
                    fetchPriority="high"
                  />
                </div>
                <div className="flex flex-col items-center gap-3 sm:gap-4 mt-2">
                  <span className="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-800 tracking-tight leading-tight line-clamp-2 px-3 group-hover:text-primary transition-colors duration-300">
                    {partner.name}
                  </span>
                  <span className="font-mono text-sm sm:text-base uppercase tracking-wider text-slate-400 font-extrabold bg-slate-50 px-6 py-2 rounded-full border border-slate-100">
                    {partner.acronym}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
