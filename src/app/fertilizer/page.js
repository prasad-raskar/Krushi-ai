"use client";
import { useState, useEffect } from 'react';
import AnimatedParticles from '@/components/AnimatedParticles';
import AgriDictionary from '@/components/AgriDictionary';

export default function FertilizerGuide() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden bg-[#020804]">
      <AnimatedParticles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#020804] to-[#020804] pointer-events-none" />
      <div className="glow-bg opacity-40" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col">
        <AgriDictionary />
      </div>
    </div>
  );
}
