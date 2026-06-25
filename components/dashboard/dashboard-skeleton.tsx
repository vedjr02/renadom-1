"use client";

import { LOADING_LABEL } from "@/lib/dashboard/ui-copy";

import { motion } from "framer-motion";

const pulse = {
  animate: { opacity: [0.35, 0.7, 0.35] },
  transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const },
};

export function DashboardSkeleton() {
  return (
    <main aria-busy="true" className="mx-auto w-full max-w-[1480px] flex-1 px-6 py-10 sm:px-10 lg:px-14">
      <p className="mb-4 text-center text-xs uppercase tracking-wider text-zinc-600">{LOADING_LABEL}</p>
      <motion.div {...pulse} className="mb-10 h-28 rounded-lg bg-zinc-900" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={index}
            {...pulse}
            transition={{ ...pulse.transition, delay: index * 0.08 }}
            className="h-44 rounded-lg bg-zinc-900"
          />
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={`zone-${index}`}
            {...pulse}
            transition={{ ...pulse.transition, delay: index * 0.06 }}
            className="h-36 rounded-lg bg-zinc-900"
          />
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <motion.div {...pulse} className="h-96 rounded-lg bg-zinc-900" />
        <motion.div {...pulse} className="h-96 rounded-lg bg-zinc-900" />
      </div>
      <motion.div {...pulse} className="mt-6 h-80 rounded-lg bg-zinc-900" />
    </main>
  );
}
