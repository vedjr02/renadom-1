"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { zoneAccentColors } from "@/lib/dashboard/zone-colors";
import type { ZoneLoadMetric } from "@/lib/simulation/types";
import { opsLabel } from "@/lib/dashboard/ui-theme";

interface ZoneHeatmapStripProps {
  zones: ZoneLoadMetric[];
}

const riskStyles = {
  Low: "from-lime-500/80 to-lime-500/30",
  Med: "from-amber-500/80 to-amber-500/30",
  High: "from-red-500/80 to-red-500/30",
};

const zoneShortName = (zone: ZoneLoadMetric["zone"]) => zone.split("—")[0]?.trim() ?? zone;

export function ZoneHeatmapStrip({ zones }: ZoneHeatmapStripProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {zones.map((zone, index) => (
        <motion.div
          key={zone.zone}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * index, duration: 0.4 }}
          className={`ops-card border-l-4 p-5 ${zoneAccentColors[zone.zone]}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={opsLabel}>{zoneShortName(zone.zone)}</p>
              <p className="mt-1 text-sm font-medium text-zinc-300">{zone.zone.split("—")[1]?.trim()}</p>
            </div>
            <span className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {zone.breachRisk} risk
            </span>
          </div>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="font-display text-2xl font-bold text-zinc-100">
                <AnimatedNumber value={zone.utilization} format={(n) => `${Math.round(n)}%`} />
              </p>
              <p className="mt-1 text-xs text-zinc-500">Utilization</p>
            </div>
            <p className="text-xs text-zinc-500">
              <AnimatedNumber value={zone.ordersInZone} format={(n) => `${Math.round(n)}`} /> orders
            </p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
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
