"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { zoneAccentColors } from "@/lib/dashboard/zone-colors";
import type { ZoneLoadMetric } from "@/lib/simulation/types";

interface ZoneHeatmapStripProps {
  zones: ZoneLoadMetric[];
}

const riskStyles = {
  Low: "from-emerald-400/80 to-emerald-400/30",
  Med: "from-amber-400/80 to-amber-400/30",
  High: "from-red-400/80 to-red-400/30",
};

const zoneShortName = (zone: ZoneLoadMetric["zone"]) =>
  zone.split("—")[0]?.trim() ?? zone;

export function ZoneHeatmapStrip({ zones }: ZoneHeatmapStripProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {zones.map((zone, index) => (
        <motion.div
          key={zone.zone}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * index, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className={`glass-panel relative overflow-hidden p-5 bg-gradient-to-br ${zoneAccentColors[zone.zone]}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">
                {zoneShortName(zone.zone)}
              </p>
              <p className="mt-1 text-sm font-medium text-white/80">
                {zone.zone.split("—")[1]?.trim()}
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/50">
              {zone.breachRisk} risk
            </span>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="font-[family-name:var(--font-syne)] text-2xl font-bold text-white">
                <AnimatedNumber value={zone.utilization} format={(n) => `${Math.round(n)}%`} />
              </p>
              <p className="mt-1 text-xs text-white/40">Utilization</p>
            </div>
            <p className="text-xs text-white/45">
              <AnimatedNumber value={zone.ordersInZone} format={(n) => `${Math.round(n)}`} /> orders
            </p>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${riskStyles[zone.breachRisk]}`}
              animate={{ width: `${zone.utilization}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
}
