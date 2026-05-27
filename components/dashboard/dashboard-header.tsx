"use client";

import { motion } from "framer-motion";
import { useLiveClock } from "@/hooks/useLiveClock";
import { StatPill } from "@/components/dashboard/stat-pill";
import { formatHourLabel } from "@/hooks/useStoreSimulation";

interface DashboardHeaderProps {
  lastUpdated: number;
  activeOrders: number;
}

const zones = [
  { label: "Cold Chain", load: "High", tone: "from-cyan-400/20 to-cyan-400/5" },
  { label: "Ambient", load: "Med", tone: "from-violet-400/20 to-violet-400/5" },
  { label: "High-Velocity", load: "Peak", tone: "from-emerald-400/20 to-emerald-400/5" },
];

export function DashboardHeader({
  lastUpdated,
  activeOrders,
}: DashboardHeaderProps) {
  const now = useLiveClock(1000);

  return (
    <header className="glass-panel relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
      <div className="glass-panel pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="glass-panel pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="glass-panel relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="glass-panel max-w-3xl space-y-4">
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-cyan-200/90"
          >
            <span className="glass-panel relative flex h-1.5 w-1.5">
              <span className="glass-panel absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-70" />
              <span className="glass-panel relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
            </span>
            Live Dark Store Ops
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-panel font-[family-name:var(--font-syne)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
          >
            <span className="glass-panel text-gradient">Profitability</span>
            <br />
            <span className="glass-panel text-white/95">& SLA Command Center</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel max-w-2xl text-sm leading-7 text-white/55"
          >
            Streaming mock backend across three warehouse zones. {activeOrders} orders
            in-flight · last sync {formatHourLabel(lastUpdated || now)}.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12 }}
          className="glass-panel flex flex-col gap-3 xl:min-w-[220px]"
        >
          <StatPill label="Active Orders" value={activeOrders.toString()} />
          <StatPill label="Last Sync" value={formatHourLabel(lastUpdated || now)} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.14 }}
          className="glass-panel grid gap-3 sm:grid-cols-3 xl:min-w-[420px]"
        >
          {zones.map((zone, index) => (
            <div
              key={zone.label}
              className={`rounded-2xl border border-white/[0.08] bg-gradient-to-br ${zone.tone} p-4`}
            >
              <p className="glass-panel text-[10px] uppercase tracking-[0.22em] text-white/45">
                Zone {String.fromCharCode(65 + index)}
              </p>
              <p className="glass-panel mt-2 font-[family-name:var(--font-syne)] text-sm font-semibold text-white/90">
                {zone.label}
              </p>
              <p className="glass-panel mt-1 text-xs text-white/50">{zone.load} load</p>
            </div>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
