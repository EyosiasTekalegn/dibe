import { useAppConfig } from "../context/AppConfigContext";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { SEO } from "../components/SEO";

interface ProjectSliderProps {
  images: string[];
  projectId: string;
  customImages: string[];
  isPriority?: boolean;
}

function ProjectSlider({
  images,
  projectId,
  customImages,
  isPriority = false,
}: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(nextSlide, 4000); // Auto change every 4 seconds
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="relative aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transition-all duration-300 group">
      {images.map((imgSrc, idx) => {
        const actualSrc = customImages[idx] || imgSrc;
        return (
          <img
            key={idx}
            src={actualSrc}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            alt={`Project view ${idx + 1}`}
            loading={isPriority || idx === 0 ? "eager" : "lazy"}
            decoding="sync"
            fetchPriority={isPriority || idx === 0 ? "high" : "auto"}
          />
        );
      })}

      {/* Decorative badge */}
      <div className="absolute top-4 md:top-6 left-4 md:left-6 text-white text-[10px] font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20 z-20">
        Project {projectId}
      </div>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center px-2 md:px-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20">
            <button
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 md:px-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20">
            <button
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Projects() {
  const config = useAppConfig();

  const [customProjectImages, setCustomProjectImages] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    if (config?.projectImages) {
      setCustomProjectImages(config.projectImages);
    }
  }, [config]);

  const projects = [
    {
      id: "02",
      title: "Chaka Project",
      location: "Addis ababa , Ethiopia",
      desc: "Custom grand architectural structural frame designs and heavy aluminum frameworks.",
      fullDesc:
        "An elite developmental milestone. We custom-fabricated and installed premium-grade, heavy structural steel column brackets and engineered advanced weather-resistant aluminum structures. The project demanded flawless weld testing and high-strength metal treatments to endure demanding elevation loads and pristine environmental parameters.",
      images: [
        "/projects/project_02_0.jpg",
        "/projects/project_02_1.jpg",
        "/projects/project_02_2.jpg",
      ],
      stats: [
        { label: "Metal Class", value: "Grade 350 Steel" },
        { label: "Weld NDT", value: "100% Passed" },
        { label: "Status", value: "Delivered" },
      ],
    },
    {
      id: "06",
      title: "Habesha Cement Apron Feeder",
      location: "Addis ababa , Ethiopia",
      desc: "Successful manufacturing of 60 lamella plates for the apron feeder, meeting industrial specifications.",
      fullDesc:
        "Heavy industrial manufacturing at its core. We engineered and fabricated 60 high-stress lamella plates for continuous cement feed operations. The plates were treated for extreme abrasion resistance to withstand the massive throughput of raw limestone.",
      images: [
        "/projects/project_06_0.jpg",
        "/projects/project_06_1.jpg",
        "/projects/project_06_2.jpg",
      ],
      stats: [
        { label: "Component", value: "60 Lamella Plates" },
        { label: "Treatment", value: "Abrasion Resistant" },
        { label: "Status", value: "Completed" },
      ],
    },
    {
      id: "03",
      title: "Prime Minister's Office Renovation",
      location: "Addis Ababa, Ethiopia",
      desc: "High-grade bespoke structural framework and premium architectural aluminum integrations.",
      fullDesc:
        "Prestigious restoration and modern structural upgrading. Dibe Engineering fabricated and integrated state-of-the-art high-load steel bracing alongside elegant architectural custom aluminum windows and heavy-duty structural facades. The project operated under maximum security and required ultra-strict execution tolerances.",
      images: [
        "/projects/project_03_0.jpg",
        "/projects/project_03_1.jpg",
        "/projects/project_03_2.jpg",
      ],
      stats: [
        { label: "Execution Tol.", value: "Zero Tolerance" },
        { label: "Fabrication", value: "Bespoke Heavy" },
        { label: "Status", value: "Completed" },
      ],
    },
    {
      id: "01",
      title: "Ethiopian Airlines Expansion",
      location: "Addis Ababa, Ethiopia",
      desc: "Comprehensive electromechanical and steel framing installations for modern aviation demands.",
      fullDesc:
        "Dibe Engineering executed the high-tolerance structural steel fabrication and precision erection for key hangar components. Additionally, we designed and integrated high-strength overhead trusses, complex electromechanical safety modules, and reliable heavy fabrication to support the airline's continuous operational expansion.",
      images: [
        "/projects/project_01_0.jpg",
        "/projects/project_01_1.jpg",
        "/projects/project_01_2.jpg",
      ],
      stats: [
        { label: "Steel Weight", value: "350+ Tons" },
        { label: "Erection Tol.", value: "±2mm" },
        { label: "Status", value: "Fully Operational" },
      ],
    },
    {
      id: "04",
      title: "Chefe Donsa Toll Road Screen",
      location: "East Shewa, Oromia Region",
      desc: "Heavy metal fabrication and screen installation for central traffic flow automation systems.",
      fullDesc:
        "Engineering high-visibility industrial systems. We fabricated the rigid weather-resistant supporting truss frames, structural columns, and protection canopies for the Toll Road's large-scale automated LED information display screen. All welds were hot-dip galvanized to withstand intense outdoor environment exposure.",
      images: [
        "/projects/project_04_0.jpg",
        "/projects/project_04_1.jpg",
        "/projects/project_04_2.jpg",
      ],
      stats: [
        { label: "Coating", value: "Hot-Dip Galvanized" },
        { label: "Wind Rating", value: "Up to 120 km/h" },
        { label: "Status", value: "Commissioned" },
      ],
    },
    {
      id: "05",
      title: "Road Molds Fabrication",
      location: "Adama Asela & Chefe Donsa",
      desc: "ERA mold fabrication executed precisely for continuous infrastructure road developments.",
      fullDesc:
        "We supplied the Ethiopian Roads Authority with heavy-duty reusable steel molds for road curbing, drainage, and structural forming. The molds were laser-cut for extreme precision, allowing rapid curing and consistent concrete pouring across multiple regional infrastructure upgrades.",
      images: [
        "/projects/project_05_0.jpg",
        "/projects/project_05_1.jpg",
        "/projects/project_05_2.jpg",
      ],
      stats: [
        { label: "Client", value: "ERA" },
        { label: "Type", value: "Precision Molding" },
        { label: "Status", value: "Delivered" },
      ],
    },
  ];

  return (
    <div className="py-24 sm:py-32 md:py-40 bg-light-bg min-h-screen">
      <SEO
        title="Our Projects | Dibe Engineering"
        description="View our portfolio of precision engineering projects, covering complex steelworks and electromechanical construction."
      />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="mb-16 sm:mb-24 md:mb-28 max-w-4xl">
          <h1 className="text-xs sm:text-sm font-mono tracking-[0.25em] font-bold uppercase text-primary mb-3">
            Our Portfolio
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black mb-6 leading-tight tracking-tight">
            Featured Projects
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
            Explore our curated selection of projects spanning complex
            structural steelworks, advanced electromechanical systems, and
            custom automation solutions. Each project reflects our commitment to
            precision, innovation, and uncompromising quality.
          </p>
        </div>

        <div className="flex flex-col gap-24 sm:gap-36 md:gap-44">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 md:gap-16 lg:gap-24 items-center`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full lg:w-7/12 relative"
              >
                <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl blur-xl md:blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <ProjectSlider
                  images={project.images}
                  projectId={project.id}
                  customImages={
                    customProjectImages[project.id] ||
                    []
                  }
                  isPriority={true}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="w-full lg:w-5/12 flex flex-col justify-center px-1 md:px-0"
              >
                <div className="inline-flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-light-gray">
                    {project.location}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-4 leading-tight tracking-tight">
                  {project.title}
                </h3>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
                  {project.fullDesc}
                </p>


              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
