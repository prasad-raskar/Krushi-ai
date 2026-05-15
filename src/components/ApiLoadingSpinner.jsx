"use client";
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

/**
 * ─── ApiLoadingSpinner ───────────────────────────────────────────────
 * Full-area loading state with dual spinning rings, matching the
 * "Neural Processing" aesthetic used across KrushiAI pages.
 *
 * Props:
 *   message  – optional status text (default: "Loading…")
 */
export default function ApiLoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-28 h-28 mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-t-emerald-400 border-r-emerald-400/40 border-b-transparent border-l-transparent"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border-2 border-t-transparent border-r-transparent border-b-emerald-400 border-l-emerald-400/40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sprout className="w-10 h-10 text-emerald-400" />
        </div>
      </div>
      <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase">{message}</p>
    </div>
  );
}
