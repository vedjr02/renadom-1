"use client";

import { DonutChart, Legend } from "@tremor/react";
import type { RevenueSlice } from "@/lib/simulation/types";

interface RevenueDonutChartProps {
  data: RevenueSlice[];
}

export function RevenueDonutChart({ data }: RevenueDonutChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <section className="glass-panel flex h-full flex-col p-6">
      <div className="mb-6 space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">
          Revenue Breakdown
        </h2>
        <p className="text-sm text-muted-foreground">
          Category mix · ${total.toLocaleString()} shift revenue
        </p>
      </div>
      <DonutChart
        data={data}
        category="value"
        index="name"
        valueFormatter={(value) => `$${value.toLocaleString()}`}
        colors={["cyan", "violet", "amber"]}
        className="h-52"
      />
      <Legend
        categories={data.map((slice) => slice.name)}
        colors={["cyan", "violet", "amber"]}
        className="mt-4 justify-center"
      />
    </section>
  );
}
