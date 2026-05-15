"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, Scan, Mic, CloudRain, BarChart3, Sprout, Landmark, Languages, ShieldPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, toggleLang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const content = {
    en: {
      brand: "Krushi",
      links: [
        { name: 'Home', href: '/', icon: Leaf },
        { name: 'Yield', href: '/yield', icon: BarChart3 },
        { name: 'Fertilizer', href: '/fertilizer', icon: Sprout },
        { name: 'Schemes', href: '/schemes', icon: Landmark },
        { name: 'Crop Care', href: '/crop-care', icon: ShieldPlus },
      ]
    },
    mr: {
      brand: "कृषी",
      links: [
        { name: 'मुख्यपृष्ठ', href: '/', icon: Leaf },
        { name: 'उत्पादन', href: '/yield', icon: BarChart3 },
        { name: 'खते', href: '/fertilizer', icon: Sprout },
        { name: 'योजना', href: '/schemes', icon: Landmark },
        { name: 'पीक संरक्षण', href: '/crop-care', icon: ShieldPlus },
      ]
    }
  };

  const currentContent = mounted ? content[lang] : content.mr; // Default to Marathi before hydration
  const isActive = (href) => pathname === href;

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${
      scrolled
        ? 'bg-[#020804]/95 backdrop-blur-3xl border-b border-emerald-900/50 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="p-2 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-black shadow-[0_0_20px_rgba(52,211,153,0.5)] group-hover:shadow-[0_0_30px_rgba(52,211,153,0.7)] transition-shadow"
            >
              <Leaf className="h-5 w-5" />
            </motion.div>
            <span className="text-xl font-black tracking-tighter text-white">
              {currentContent.brand}<span className="text-emerald-400">AI</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-1 mr-4">
              {currentContent.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-300 group
                    ${isActive(link.href)
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-[1px] h-[2px] bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              ))}
            </div>
            {/* Language Toggle Button */}
            {mounted && (
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/10 transition-colors text-sm shadow-[0_0_10px_rgba(52,211,153,0.1)]"
              >
                <Languages className="w-4 h-4" />
                {lang === 'mr' ? 'English' : 'मराठी'}
              </button>
            )}
          </div>

          {/* Mobile menu button & Language Toggle */}
          <div className="flex lg:hidden items-center gap-4">
            {mounted && (
              <button 
                onClick={toggleLang}
                className="p-2 rounded-full border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
              >
                <Languages className="w-5 h-5" />
              </button>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-emerald-400 hover:text-white hover:bg-emerald-900/40 focus:outline-none transition-all border border-emerald-500/20"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden overflow-hidden glass-panel border-t border-emerald-900/30"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {currentContent.links.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200
                        ${isActive(link.href)
                          ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                          : 'text-gray-300 hover:text-white hover:bg-emerald-900/30 border border-transparent'
                        }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive(link.href) ? 'text-emerald-400' : 'text-gray-500'}`} />
                      {link.name}
                      {isActive(link.href) && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
