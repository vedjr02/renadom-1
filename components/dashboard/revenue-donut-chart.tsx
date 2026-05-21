"use client";

import { DonutChart, Legend } from "@tremor/react";
import { motion } from "framer-motion";
import type { RevenueSlice } from "@/lib/simulation/types";

interface RevenueDonutChartProps {
  data: RevenueSlice[];
}

export function RevenueDonutChart({ data }: RevenueDonutChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <motion.section
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className="glass-panel glow-ring relative flex h-full flex-col p-6"
    >
      <div className="mb-2 space-y-1">
        <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold tracking-tight text-white">
          Revenue Breakdown
        </h2>
        <p className="text-sm text-white/45">Category contribution mix</p>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <DonutChart
          data={data}
          category="value"
          index="name"
          valueFormatter={(value) => `$${value.toLocaleString("en-US")}`}
          colors={["cyan", "violet", "amber"]}
          className="h-56"
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">Shift</p>
          <p className="font-[family-name:var(--font-syne)] text-2xl font-bold text-white">
            ${(total / 1000).toFixed(0)}k
          </p>
        </div>
      </div>

      <Legend
        categories={data.map((slice) => slice.name)}
        colors={["cyan", "violet", "amber"]}
        className="mt-2 justify-center"
      />
    </motion.section>
  );
}
