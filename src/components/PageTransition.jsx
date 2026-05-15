"use client";
import { motion } from 'framer-motion';

/**
 * ─── PageTransition ──────────────────────────────────────────────────
 * Wraps every page with a cinematic entrance animation.
 * Uses Framer Motion to fade-in, slide-up, and un-blur.
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
