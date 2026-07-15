import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Logo } from './Logo';
import { useAppConfig } from '../context/AppConfigContext';

export function Layout() {
  const config = useAppConfig();
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (config?.mainLogo) {
      setCustomLogoUrl(config.mainLogo);
    }
  }, [config]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent bg-white',
          isScrolled ? 'shadow-sm border-border py-2' : 'py-4'
        )}
      >
        <div className="container mx-auto px-4 md:px-6 h-20 md:h-28 flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-2 relative z-50 h-20 md:h-28 w-auto px-3 rounded-2xl transition-all duration-300 hover:bg-slate-50/50 group/logo"
          >
            <div className="h-full flex items-center py-2 relative">
              <img 
                src={customLogoUrl || '/logo.png'} 
                alt="Logo" 
                className="h-16 md:h-24 lg:h-28 w-auto object-contain object-left transition-all duration-300" 
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  // Fallback if logo.png fails to load
                  (e.target as HTMLImageElement).src = '/logo.svg';
                }}
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-[13px] uppercase tracking-[0.1em] font-bold hover:text-primary transition-colors',
                  location.pathname === link.path ? 'text-primary' : 'text-black'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden relative z-50 p-2 text-black hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-[100px] px-6"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-xl font-black uppercase tracking-wider',
                    location.pathname === link.path ? 'text-primary' : 'text-black'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-[100px] md:pt-[128px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-border mt-auto">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="inline-flex mb-4 h-16 md:h-20 w-auto">
                <Link to="/" className="h-full flex items-center">
                  {customLogoUrl ? (
                    <img src={customLogoUrl} alt="Logo" className="h-16 md:h-20 w-auto object-contain object-left" loading="eager" fetchPriority="high" />
                  ) : (
                    <Logo className="h-16 md:h-20 w-auto" />
                  )}
                </Link>
              </div>
              <p className="text-text-gray text-sm max-w-sm mb-6 leading-relaxed">
                As a leading provider of engineering solutions, we deliver excellence in custom steelworks, aluminum architectures, and industrial manufacturing.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm text-text-gray hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/services" className="text-sm text-text-gray hover:text-primary transition-colors">Our Services</Link></li>
                <li><Link to="/projects" className="text-sm text-text-gray hover:text-primary transition-colors">Featured Projects</Link></li>
                <li><Link to="/contact" className="text-sm text-text-gray hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span className="text-sm text-text-gray">Addis Ababa, Ethiopia</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm text-text-gray">+251(9) 2072 8356</span>
                    <span className="text-sm text-text-gray">+251(9) 1139 0184</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span className="text-sm text-text-gray break-all">info@dibeengineering.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-text-light-gray uppercase tracking-wider font-bold">
              © {new Date().getFullYear()} Dibe Engineering. All rights reserved.
            </p>
            <p className="text-xs text-text-light-gray uppercase tracking-wider font-bold">
              Where innovation meets precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
