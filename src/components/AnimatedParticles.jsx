"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1,
      duration: Math.random() * 25 + 12,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.5 + 0.2,
      blur: Math.random() > 0.6 ? 2 : 0,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            filter: `blur(${p.blur}px)`,
            background: p.size > 3
              ? 'radial-gradient(circle, rgba(52,211,153,0.6) 0%, rgba(16,185,129,0) 70%)'
              : 'rgba(52,211,153,0.4)',
          }}
          animate={{
            y: ["0vh", "-110vh"],
            x: [0, (Math.random() - 0.5) * 40],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
