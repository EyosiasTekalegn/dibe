import { useAppConfig } from "../context/AppConfigContext";
import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SEO } from "../components/SEO";
import { cn } from "../lib/utils";

export function Services() {
  const config = useAppConfig();

  const [customServiceImages, setCustomServiceImages] = useState<
    Record<number, string>
  >({});

  React.useEffect(() => {
    if (config?.serviceImages) {
      setCustomServiceImages(config.serviceImages);
    }
  }, [config]);

  const serviceCategories = [
    {
      title: "Steel & Metal Works",
      icon: "🏗️",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200",
      description:
        "Precision engineering for structural integrity. Our advanced fabrication facilities handle complex geometries and heavy-duty structural requirements.",
      services: [
        "Steel Structure Design and Simulation",
        "Laser cutting and bending",
        "Truss and Purlin Roof Construction",
        "Formwork and Mold Fabrication",
        "Handrails, Guardrails, Balustrades",
        "Custom Gates, Entrance Doors",
        "Metal Partitions, Facades",
        "Canopies, Pergolas, Roof Fabrications",
      ],
    },
    {
      title: "Electromechanical Works",
      icon: "⚙️",
      image: "/services/service_1.jpg",
      description:
        "Intelligent systems and mechanical precision. We design and manufacture custom components to drive operational efficiency.",
      services: [
        "Mechanical Spare Parts Manufacturing",
        "Automation Integration",
        "Custom Metal Components for Automated Systems",
        "Specialized Equipment Design and Manufacturing",
        "Large-scale LED Screen Installations",
        "Mechanical Component Design for Specific Needs",
      ],
    },
    {
      title: "Aluminum Works",
      icon: "🏢",
      image: "/services/service_2.jpg",
      description:
        "High-quality architectural aluminum solutions. We design and install durable, aesthetic, and energy-efficient aluminum setups for modern buildings.",
      services: [
        "Curtain Walls and Facades",
        "Aluminum Windows and Doors",
        "Storefronts and Entrances",
        "Skylights and Canopies",
        "Aluminum Composite Panel (ACP) Cladding",
        "Thermal and Acoustic Insulation Setup",
        "Custom Aluminum Extrusion Frameworks",
      ],
    },
  ];

  return (
    <div className="py-24 sm:py-32 md:py-40 bg-light-bg min-h-screen">
      <SEO
        title="Our Services | Dibe Engineering"
        description="Explore our specialized services in Custom Metalworks, Electromechanical Automation, and Architectural Aluminum tailored for industrial needs."
      />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="mb-16 sm:mb-24 md:mb-28 text-center max-w-4xl mx-auto">
          <h1 className="text-xs sm:text-sm font-mono tracking-[0.25em] font-bold uppercase text-primary mb-4">
            Our Offerings
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black mb-6 leading-none tracking-tight">
            Engineering Services
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
            We provide end-to-end industrial solutions, integrating custom
            heavy fabrication, high-quality aluminum architectural setups, and
            advanced electromechanical engineering.
          </p>
        </div>

        <div className="flex flex-col gap-24 sm:gap-36 md:gap-44 pb-24">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-24 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl sm:text-5xl hidden sm:block">
                    {category.icon}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black leading-tight tracking-tight">
                    {category.title}
                  </h3>
                </div>

                <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed lg:pr-12 font-normal">
                  {category.description}
                </p>

                <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-black/5 shadow-sm">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.services.map((service, i) => (
                      <li key={i} className="flex items-start gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                        <span className="text-primary shrink-0 mt-1">
                          <CheckCircle2 className="w-4.5 h-4.5 text-primary" />
                        </span>
                        <span className="text-slate-800 text-sm sm:text-base font-semibold leading-snug">
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl group border-4 border-white relative transition-all duration-300">
                  <img
                    src={customServiceImages[index] || category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                  />

                  {/* Decorative numeric indicator */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/90 backdrop-blur-sm text-black font-black text-xl md:text-2xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-lg z-30 pointer-events-none">
                    0{index + 1}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
