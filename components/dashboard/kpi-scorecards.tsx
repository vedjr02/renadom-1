"use client";

import { SparkAreaChart } from "@tremor/react";
import type { KpiSnapshot } from "@/lib/simulation/types";

interface KpiScorecardsProps {
  kpis: KpiSnapshot;
}

const sparkData = (values: number[], key: string) =>
  values.map((value, index) => ({ index, [key]: value }));

export function KpiScorecards({ kpis }: KpiScorecardsProps) {
  const cards = [
    {
      label: "SLA Compliance Rate",
      value: `${kpis.slaComplianceRate}%`,
      delta: "Last 12 ticks",
      data: sparkData(kpis.slaSparkline, "sla"),
      category: "sla",
      color: "cyan" as const,
    },
    {
      label: "Avg Picker Time",
      value: `${kpis.avgPickerTimeSec}s`,
      delta: "Pick-to-pack median",
      data: sparkData(kpis.pickerSparkline, "picker"),
      category: "picker",
      color: "emerald" as const,
    },
    {
      label: "Inventory Waste Cost",
      value: `$${kpis.inventoryWasteCost.toLocaleString()}`,
      delta: "Shift-to-date spoilage",
      data: sparkData(kpis.wasteSparkline, "waste"),
      category: "waste",
      color: "amber" as const,
    },
    {
      label: "Live Active Orders",
      value: kpis.activeOrders.toString(),
      delta: "Across 3 zones",
      data: sparkData(kpis.ordersSparkline, "orders"),
      category: "orders",
      color: "violet" as const,
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="glass-panel p-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {card.label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            {card.value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{card.delta}</p>
          <div className="mt-5 h-14">
            <SparkAreaChart
              data={card.data}
              categories={[card.category]}
              index="index"
              colors={[card.color]}
              className="h-14"
            />
          </div>
        </article>
      ))}
    </section>
  );
}
