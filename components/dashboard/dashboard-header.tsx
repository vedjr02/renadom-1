"use client";

import { motion } from "framer-motion";
import { useLiveClock } from "@/hooks/useLiveClock";
import { OpsPulseIndicator } from "@/components/dashboard/ops-pulse-indicator";
import { StatPill } from "@/components/dashboard/stat-pill";
import { formatHourLabel } from "@/hooks/useStoreSimulation";
import { opsLabel } from "@/lib/dashboard/ui-theme";

interface DashboardHeaderProps {
  lastUpdated: number;
  activeOrders: number;
  paused?: boolean;
}

const zones = [
  { label: "Cold Chain", load: "High", accent: "border-orange-500/30 bg-orange-500/5" },
  { label: "Ambient", load: "Med", accent: "border-zinc-600 bg-zinc-900/60" },
  { label: "High-Velocity", load: "Peak", accent: "border-lime-500/30 bg-lime-500/5" },
];

export function DashboardHeader({ lastUpdated, activeOrders, paused = false }: DashboardHeaderProps) {
  const now = useLiveClock(1000);

  return (
    <header className="ops-card glow-ring relative overflow-hidden p-8">
      <div className="relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 rounded-md border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-orange-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-400" />
            </span>
            {paused ? "Stream Paused" : "Live Dark Store Ops"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
          >
            <span className="text-gradient">Profitability</span>
            <br />
            <span className="text-zinc-100">& SLA Command Center</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-sm leading-7 text-zinc-400"
          >
            Streaming mock backend across three warehouse zones. {activeOrders} orders in-flight · last sync{" "}
            {formatHourLabel(lastUpdated || now)}.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12 }}
          className="flex flex-col gap-3 xl:min-w-[220px]"
        >
          <OpsPulseIndicator paused={paused} />
          <StatPill label="Active Orders" value={activeOrders.toString()} />
          <StatPill label="Last Sync" value={formatHourLabel(lastUpdated || now)} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.14 }}
          className="grid gap-3 sm:grid-cols-3 xl:min-w-[420px]"
        >
          {zones.map((zone, index) => (
            <div key={zone.label} className={`rounded-md border p-4 ${zone.accent}`}>
              <p className={opsLabel}>Zone {String.fromCharCode(65 + index)}</p>
              <p className="font-display mt-2 text-sm font-semibold text-zinc-200">{zone.label}</p>
              <p className="mt-1 text-xs text-zinc-500">{zone.load} load</p>
            </div>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
