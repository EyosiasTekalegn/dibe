import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { SEO } from '../components/SEO';

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Inquiry from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(`Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    
    window.location.href = `mailto:info@dibeengineering.com?subject=${subject}&body=${body}`;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <div className="py-16 md:py-24 bg-light-bg min-h-screen">
      <SEO 
        title="Contact Us | Dibe Engineering" 
        description="Get in touch with Dibe Engineering for inquiries, quotes, or to discuss your custom steelworks and automation requirements." 
      />
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <h1 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#888] mb-3">Get in Touch</h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight">Contact Us</h2>
          <p className="text-text-gray text-lg md:text-xl leading-relaxed">
            Have a question, a project in mind, or need expert engineering consultation? Reach out to us, and our team will get back to you promptly to discuss your requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/5">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 lg:p-16 lg:col-span-3"
          >
            <h3 className="text-2xl md:text-3xl font-black text-black mb-2">Send a Message</h3>
            <p className="text-text-gray mb-10 leading-relaxed">Fill out the form below and we'll get back to you within 24 hours.</p>
            <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2 group">
                  <label htmlFor="firstName" className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-light-gray group-focus-within:text-black transition-colors">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-border text-base focus:outline-none focus:border-primary transition-all placeholder:text-border"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2 group">
                  <label htmlFor="lastName" className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-light-gray group-focus-within:text-black transition-colors">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-border text-base focus:outline-none focus:border-primary transition-all placeholder:text-border"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="space-y-2 group">
                <label htmlFor="email" className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-light-gray group-focus-within:text-black transition-colors">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-border text-base focus:outline-none focus:border-primary transition-all placeholder:text-border"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2 group">
                <label htmlFor="message" className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-light-gray group-focus-within:text-black transition-colors">Your Message</label>
                <textarea 
                  id="message" 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-border text-base focus:outline-none focus:border-primary transition-all resize-none placeholder:text-border pt-4"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-black hover:bg-primary text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-primary/30 mt-4 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Send Inquiry'} {!isSubmitting && <Send size={16} />}
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-medium">
                  Message sent successfully! We will get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium">
                  Failed to send message. Please try again later.
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black text-white p-8 md:p-12 lg:p-16 lg:col-span-2 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black mb-12">Contact Info</h3>
              
              <div className="space-y-12">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <Phone className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#888] mb-2">Call Us</h4>
                    <p className="text-lg font-medium">+251(9) 2072 8356</p>
                    <p className="text-lg font-medium text-white/80">+251(9) 1116 4341</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <Mail className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#888] mb-2">Email Us</h4>
                    <p className="text-lg font-medium break-all">info@dibeengineering.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#888] mb-2">Visit Us</h4>
                    <p className="text-lg font-medium leading-relaxed">Addis Ababa,<br />Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
