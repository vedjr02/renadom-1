"use client";

import { SparkAreaChart } from "@tremor/react";
import { motion } from "framer-motion";
import { Clock3, Package, Trash2, TrendingUp } from "lucide-react";
import type { KpiSnapshot } from "@/lib/simulation/types";

interface KpiScorecardsProps {
  kpis: KpiSnapshot;
}

const sparkData = (values: number[], key: string) =>
  values.map((value, index) => ({ index, [key]: value }));

export function KpiScorecards({ kpis }: KpiScorecardsProps) {
  const cards = [
    {
      label: "SLA Compliance",
      value: `${kpis.slaComplianceRate}%`,
      delta: "+0.8 vs last hour",
      icon: TrendingUp,
      accent: "text-cyan-300",
      glow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]",
      data: sparkData(kpis.slaSparkline, "sla"),
      category: "sla",
      color: "cyan" as const,
    },
    {
      label: "Avg Picker Time",
      value: `${kpis.avgPickerTimeSec}s`,
      delta: "Pick-to-pack median",
      icon: Clock3,
      accent: "text-emerald-300",
      glow: "hover:shadow-[0_0_40px_rgba(52,211,153,0.16)]",
      data: sparkData(kpis.pickerSparkline, "picker"),
      category: "picker",
      color: "emerald" as const,
    },
    {
      label: "Inventory Waste",
      value: `$${kpis.inventoryWasteCost.toLocaleString("en-US")}`,
      delta: "Shift spoilage cost",
      icon: Trash2,
      accent: "text-amber-300",
      glow: "hover:shadow-[0_0_40px_rgba(251,191,36,0.14)]",
      data: sparkData(kpis.wasteSparkline, "waste"),
      category: "waste",
      color: "amber" as const,
    },
    {
      label: "Active Orders",
      value: kpis.activeOrders.toString(),
      delta: "Live in 3 zones",
      icon: Package,
      accent: "text-violet-300",
      glow: "hover:shadow-[0_0_40px_rgba(167,139,250,0.16)]",
      data: sparkData(kpis.ordersSparkline, "orders"),
      category: "orders",
      color: "violet" as const,
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.article
            key={card.label}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.45 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className={`glass-panel group relative overflow-hidden p-6 transition-shadow duration-500 ${card.glow}`}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
                  {card.label}
                </p>
                <p className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-white/45">{card.delta}</p>
              </div>
              <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-3 ${card.accent}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-6 h-14 opacity-90">
              <SparkAreaChart
                data={card.data}
                categories={[card.category]}
                index="index"
                colors={[card.color]}
                className="h-14"
              />
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
