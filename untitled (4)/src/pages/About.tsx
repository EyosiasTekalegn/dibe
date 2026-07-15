import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, TrendingUp, Award, HeartHandshake, Lightbulb, Shield } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useAppConfig } from '../context/AppConfigContext';

function AboutHeroImage() {
  const config = useAppConfig();
  const heroImage = config?.aboutHeroImage || "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200";

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[60vh] sm:min-h-[80vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
        <img 
          key={heroImage}
          src={heroImage} 
          alt="Dibe Engineering Team" 
          className="w-full h-full object-contain md:object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </motion.section>
  );
}

export function About() {
  return (
    <div className="py-0 bg-light-bg min-h-screen">
      <SEO 
        title="About Us | Dibe Engineering" 
        description="Learn about Dibe Engineering's heritage and our vision to deliver exceptional custom metalworks, mechanical components, and architectural aluminum solutions." 
      />
      
      {/* Hero Image Section */}
      <div className="w-full">
        <AboutHeroImage />
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-16 pt-8 md:pt-16">
        {/* Header Section (Split Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-4">Our Heritage</h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black leading-tight tracking-tight">
              Engineering with <span className="text-primary">precision</span> and <span className="text-primary">integrity</span>.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="prose prose-lg prose-p:text-text-gray prose-p:leading-relaxed"
          >
            <p className="text-lg md:text-xl text-black font-medium mb-6">
              Dibe Engineering is a leading multidisciplinary firm in Ethiopia specializing in custom steelworks, architectural aluminum, and advanced electromechanical automation.
            </p>
            <p>
              Since our inception, we have been committed to delivering robust, scalable, and high-tolerance industrial solutions. We provide comprehensive solutions including product design, mechanical components, steel structures, and complete plant installation tailored to modern industrial needs.
            </p>
            <p>
              Our skilled team delivers customized projects, from intricate metal fabrications like handrails, gates, and facades to large-scale structural steel constructions, enabling scalable growth for our partners.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6">
        {/* The Quote Block */}
        <div className="mb-20 md:mb-28 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="bg-white p-10 md:p-14 rounded-3xl md:rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/5 relative text-center"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl font-serif pt-3 shadow-lg">"</div>
            <p className="text-xl md:text-2xl italic text-black font-medium mb-8 leading-relaxed">
              "I am proud to lead a team that delivers top-tier engineering services, from custom metalworks to architectural aluminum setups. Thank you for trusting us to turn your vision into reality."
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-14 h-14 bg-light-bg rounded-full flex items-center justify-center font-black text-lg text-primary mb-2">
                YT
              </div>
              <p className="text-base font-bold text-black leading-none">Yonatan Tekalegn</p>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-light-gray">CEO, Dibe Engineering</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Mission, Vision, Goal Cards */}
        <div className="mb-24 lg:mb-32">
          <div className="mb-12 max-w-2xl text-center mx-auto">
            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Core Drive</h2>
            <h3 className="text-3xl md:text-4xl font-black text-black">Mission, Vision & Goals</h3>
          </div>
          
          <div className="grid grid-cols-1 select-none md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-primary" />,
                title: 'Our Mission',
                desc: 'Deliver superior quality projects to our clients while meeting budget and schedule goals with absolute precision.'
              },
              {
                icon: <Eye className="w-8 h-8 text-primary" />,
                title: 'Our Vision',
                desc: 'Becoming a world class engineering firm delivering high end industrial products and sustainable architectural services.'
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-primary" />,
                title: 'Our Goal',
                desc: 'Ramping up productivity through latest technologies and continuous process improvement methodologies.'
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white p-8 md:p-10 rounded-2xl md:rounded-3xl border border-black/5 shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-default text-center md:text-left"
              >
                <div className="w-16 h-16 bg-light-bg rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/5 group-hover:scale-110 transition-all duration-300 mx-auto md:mx-0">
                  {item.icon}
                </div>
                <h4 className="text-lg md:text-xl font-bold text-black mb-4">{item.title}</h4>
                <p className="text-sm md:text-base text-text-gray leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How We Work Timeline */}
        <div className="mb-24 lg:mb-32">
          <div className="mb-12 md:mb-16 max-w-2xl text-center mx-auto">
            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Process</h2>
            <h3 className="text-3xl md:text-4xl font-black text-black">How We Work</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Consultation', desc: 'We begin with a thorough consultation to understand requirements, define scopes, and align with your vision.' },
              { num: '02', title: 'Engineering', desc: 'Our engineers create customized solutions using advanced design and 3D simulation tools.' },
              { num: '03', title: 'Fabrication', desc: 'Our skilled team uses state-of-the-art technology, including laser cutting, to produce high-quality components.' },
              { num: '04', title: 'Installation', desc: 'We complete the process with expert installation and ongoing support across the system lifecycle.' },
            ].map((step, i) => (
               <motion.div 
                 key={step.num}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.6, delay: i * 0.1 }}
                 className="bg-white p-8 rounded-2xl md:rounded-3xl border border-black/5 shadow-sm relative group hover:shadow-xl transition-all duration-300"
               >
                 <div className="absolute top-0 right-8 -translate-y-1/2 bg-light-bg text-black font-black text-2xl w-14 h-14 flex items-center justify-center rounded-2xl border border-border group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {step.num}
                 </div>
                 <div className="pt-4">
                   <h4 className="text-lg font-bold text-black mb-3">{step.title}</h4>
                   <p className="text-sm text-text-gray leading-relaxed">{step.desc}</p>
                 </div>
               </motion.div>
            ))}
          </div>
        </div>

        {/* Our Values - Clean Grid */}
        <div>
          <div className="mb-12 max-w-2xl mx-auto text-center">
            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-3">Core Principles</h2>
            <h3 className="text-3xl md:text-4xl font-black text-black">Our Values</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <Award className="w-8 h-8 text-primary" />, title: 'Quality', desc: 'We never compromise on the standards of our materials or workmanship.' },
              { icon: <HeartHandshake className="w-8 h-8 text-primary" />, title: 'Integrity', desc: 'Honesty and transparency guide all our client and partner relationships.' },
              { icon: <Lightbulb className="w-8 h-8 text-primary" />, title: 'Innovation', desc: 'Constantly seeking better, more efficient engineering solutions.' },
              { icon: <Shield className="w-8 h-8 text-primary" />, title: 'Safety', desc: 'Ensuring secure working environments and safe end-products always.' }
            ].map((value, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 className="bg-white p-8 rounded-2xl md:rounded-3xl border border-black/5 text-center group hover:border-primary/30 transition-colors duration-300 hover:shadow-xl"
               >
                 <div className="w-16 h-16 mx-auto bg-light-bg rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/5 transition-transform duration-300">
                   {value.icon}
                 </div>
                 <h4 className="text-lg font-bold text-black mb-3">{value.title}</h4>
                 <p className="text-sm text-text-gray leading-relaxed">{value.desc}</p>
               </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

