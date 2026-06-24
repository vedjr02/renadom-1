"use client";

import { ARIA_KPI_SECTION } from "@/lib/dashboard/aria-labels";
import { SparkAreaChart } from "@tremor/react";
import { motion } from "framer-motion";
import { Clock3, Package, Trash2, TrendingUp } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { formatCurrency, formatDuration, formatPercent } from "@/lib/formatters";
import type { KpiSnapshot } from "@/lib/simulation/types";
import { opsLabel } from "@/lib/dashboard/ui-theme";

interface KpiScorecardsProps {
  kpis: KpiSnapshot;
}

const sparkData = (values: number[], key: string) => values.map((value, index) => ({ index, [key]: value }));

export function KpiScorecards({ kpis }: KpiScorecardsProps) {
  const cards = [
    {
      label: "SLA Compliance",
      value: kpis.slaComplianceRate,
      format: (n: number) => formatPercent(n),
      delta: "+0.8 vs last hour",
      icon: TrendingUp,
      accent: "text-orange-400",
      data: sparkData(kpis.slaSparkline, "sla"),
      category: "sla",
      color: "orange" as const,
    },
    {
      label: "Avg Picker Time",
      value: kpis.avgPickerTimeSec,
      format: (n: number) => formatDuration(n),
      delta: "Pick-to-pack median",
      icon: Clock3,
      accent: "text-lime-400",
      data: sparkData(kpis.pickerSparkline, "picker"),
      category: "picker",
      color: "lime" as const,
    },
    {
      label: "Inventory Waste",
      value: kpis.inventoryWasteCost,
      format: (n: number) => formatCurrency(n),
      delta: "Shift spoilage cost",
      icon: Trash2,
      accent: "text-amber-400",
      data: sparkData(kpis.wasteSparkline, "waste"),
      category: "waste",
      color: "amber" as const,
    },
    {
      label: "Active Orders",
      value: kpis.activeOrders,
      format: (n: number) => `${Math.round(n)}`,
      delta: "Live in 3 zones",
      icon: Package,
      accent: "text-zinc-300",
      data: sparkData(kpis.ordersSparkline, "orders"),
      category: "orders",
      color: "gray" as const,
    },
  ];

  return (
    <section aria-label={ARIA_KPI_SECTION} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.article
            key={card.label}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.45 }}
            className="ops-card group relative overflow-hidden p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={opsLabel}>{card.label}</p>
                <AnimatedNumber
                  value={card.value}
                  format={card.format}
                  className="font-display mt-3 block text-3xl font-bold tracking-tight text-zinc-100"
                />
                <p className="mt-1 text-xs text-zinc-500">{card.delta}</p>
              </div>
              <div className={`rounded-md border border-zinc-700 bg-zinc-900 p-3 ${card.accent}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-6 h-14 opacity-90">
              <SparkAreaChart data={card.data} categories={[card.category]} index="index" colors={[card.color]} className="h-14" />
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
