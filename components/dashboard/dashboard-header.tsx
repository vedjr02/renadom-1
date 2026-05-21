"use client";

import { motion } from "framer-motion";

export function DashboardHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary/80">
          Live Operations
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Dark Store Profitability & SLA Engine
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Real-time analytics across three warehouse zones — cold chain, ambient,
          and high-velocity pick paths.
        </p>
      </div>
      <div className="glass-panel flex items-center gap-2 px-4 py-2.5 text-xs text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Streaming mock backend · 2s tick
      </div>
    </motion.header>
  );
}
