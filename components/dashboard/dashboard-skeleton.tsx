"use client";

import { motion } from "framer-motion";

const pulse = {
  animate: { opacity: [0.35, 0.7, 0.35] },
  transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
};

export function DashboardSkeleton() {
  return (
    <main className="mx-auto w-full max-w-[1480px] flex-1 px-6 py-10 sm:px-10 lg:px-14">
      <motion.div {...pulse} className="mb-10 h-28 rounded-3xl bg-white/[0.04]" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={index}
            {...pulse}
            transition={{ ...pulse.transition, delay: index * 0.08 }}
            className="h-44 rounded-2xl bg-white/[0.04]"
          />
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <motion.div {...pulse} className="h-96 rounded-2xl bg-white/[0.04]" />
        <motion.div {...pulse} className="h-96 rounded-2xl bg-white/[0.04]" />
      </div>
      <motion.div {...pulse} className="mt-6 h-80 rounded-2xl bg-white/[0.04]" />
    </main>
  );
}
