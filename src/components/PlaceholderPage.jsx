"use client";
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';

export default function PlaceholderPage({ title }) {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = {
    en: {
      message: "This feature is currently under development."
    },
    mr: {
      message: "हे वैशिष्ट्य सध्या विकासाधीन आहे."
    }
  };

  const curr = mounted ? content[lang] : content.mr;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="glow-bg" />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-gradient">{title}</h1>
        <p className="text-gray-400">{curr.message}</p>
      </motion.div>
    </div>
  );
}
