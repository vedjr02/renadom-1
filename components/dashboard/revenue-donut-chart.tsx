"use client";

import { ARIA_REVENUE_CHART } from "@/lib/dashboard/aria-labels";
import { DonutChart, Legend } from "@tremor/react";
import { motion } from "framer-motion";
import { RevenueDeltaBadge } from "@/components/dashboard/revenue-delta-badge";
import { REVENUE_CHART_NOTE } from "@/lib/dashboard/chart-notes";
import { PanelHeader } from "@/components/dashboard/panel-header";
import type { RevenueSlice } from "@/lib/simulation/types";

interface RevenueDonutChartProps {
  data: RevenueSlice[];
}

export function RevenueDonutChart({ data }: RevenueDonutChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <motion.section aria-label={ARIA_REVENUE_CHART} whileHover={{ y: -2 }} transition={{ duration: 0.25 }} className="ops-card glow-ring flex h-full flex-col p-6">
      <div className="mb-2 flex items-start justify-between gap-3">
        <PanelHeader title="Revenue Breakdown" subtitle={REVENUE_CHART_NOTE} badge="Shift" />
        <RevenueDeltaBadge delta={2.4} />
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        <DonutChart
          data={data}
          category="value"
          index="name"
          valueFormatter={(value) => `$${value.toLocaleString("en-US")}`}
          colors={["orange", "amber", "lime"]}
          className="h-56"
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Shift</p>
          <p className="font-display text-2xl font-bold text-zinc-100">${(total / 1000).toFixed(0)}k</p>
        </div>
      </div>
      <Legend categories={data.map((slice) => slice.name)} colors={["orange", "amber", "lime"]} className="mt-2 justify-center" />
    </motion.section>
  );
}
