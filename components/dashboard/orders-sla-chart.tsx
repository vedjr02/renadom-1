"use client";

import { motion } from "framer-motion";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PanelHeader } from "@/components/dashboard/panel-header";
import type { HourlyMetric } from "@/lib/simulation/types";

interface OrdersSlaChartProps {
  data: HourlyMetric[];
}

export function OrdersSlaChart({ data }: OrdersSlaChartProps) {
  return (
    <motion.section
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className="glass-panel glow-ring flex h-full flex-col p-6"
    >
      <PanelHeader
        title="Orders vs. SLA Breaches"
        subtitle="Rolling 12-hour throughput overlay"
        badge="Live"
      />

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            key={data[data.length - 1]?.hour}
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0)" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="orders"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="breaches"
              orientation="right"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(10,12,18,0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
            <Area
              yAxisId="orders"
              type="monotone"
              dataKey="ordersProcessed"
              name="Orders Processed"
              stroke="rgba(34,211,238,0.9)"
              fill="url(#ordersFill)"
              strokeWidth={2}
            />
            <Line
              yAxisId="breaches"
              type="monotone"
              dataKey="slaBreaches"
              name="SLA Breaches"
              stroke="rgba(248,113,113,0.95)"
              strokeWidth={2.5}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
