"use client";
import { motion } from "framer-motion";
import { Leaf, Sprout, CloudRain, Sun, Cpu, Wheat, Droplets, Zap } from "lucide-react";

export default function FloatingIcons() {
  const icons = [
    { Icon: Leaf,      top: "12%", left: "8%",  delay: 0,   size: "w-14 h-14", opacity: 0.12 },
    { Icon: Sprout,    top: "22%", left: "88%", delay: 1.2, size: "w-12 h-12", opacity: 0.15 },
    { Icon: CloudRain, top: "62%", left: "12%", delay: 2.4, size: "w-16 h-16", opacity: 0.1 },
    { Icon: Sun,       top: "72%", left: "82%", delay: 0.6, size: "w-10 h-10", opacity: 0.14 },
    { Icon: Cpu,       top: "48%", left: "92%", delay: 1.8, size: "w-12 h-12", opacity: 0.08 },
    { Icon: Wheat,     top: "35%", left: "4%",  delay: 3.0, size: "w-14 h-14", opacity: 0.12 },
    { Icon: Droplets,  top: "80%", left: "45%", delay: 0.8, size: "w-10 h-10", opacity: 0.1 },
    { Icon: Zap,       top: "18%", left: "55%", delay: 2.0, size: "w-8 h-8",   opacity: 0.06 },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, top, left, delay, size, opacity }, index) => (
        <motion.div
          key={index}
          className="absolute text-emerald-500"
          style={{ top, left, opacity }}
          animate={{
            y: [0, -18, 0, 12, 0],
            x: [0, 8, 0, -6, 0],
            rotate: [0, 8, -6, 4, 0],
            scale: [1, 1.05, 0.98, 1.02, 1],
          }}
          transition={{
            duration: 10 + index * 1.5,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className={`${size} drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]`} />
        </motion.div>
      ))}
    </div>
  );
}
