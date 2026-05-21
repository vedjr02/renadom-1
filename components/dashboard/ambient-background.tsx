"use client";

import { motion } from "framer-motion";

const orbs = [
  { size: 520, x: "8%", y: "12%", color: "rgba(34, 211, 238, 0.16)", duration: 18 },
  { size: 420, x: "72%", y: "8%", color: "rgba(167, 139, 250, 0.14)", duration: 22 },
  { size: 380, x: "58%", y: "62%", color: "rgba(52, 211, 153, 0.1)", duration: 26 },
  { size: 300, x: "18%", y: "68%", color: "rgba(251, 191, 36, 0.08)", duration: 20 },
];

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#05060a]" />
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_42%)]" />

      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
          animate={{
            x: [0, 28, -18, 0],
            y: [0, -22, 16, 0],
            scale: [1, 1.08, 0.94, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-noise opacity-[0.035]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
    </div>
  );
}
