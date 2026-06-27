"use client";

import { ARIA_SLA_CHART } from "@/lib/dashboard/aria-labels";
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
import { SLA_CHART_NOTE } from "@/lib/dashboard/chart-notes";
import { PANEL_ORDERS_SLA } from "@/lib/dashboard/panel-titles";
import { PanelHeader } from "@/components/dashboard/panel-header";
import {
  CHART_GRID,
  CHART_ORANGE,
  CHART_ORANGE_FILL,
  CHART_RED,
  CHART_TICK,
  CHART_TOOLTIP_BG,
  CHART_TOOLTIP_BORDER,
} from "@/lib/dashboard/chart-colors";
import type { HourlyMetric } from "@/lib/simulation/types";

interface OrdersSlaChartProps {
  data: HourlyMetric[];
}

export function OrdersSlaChart({ data }: OrdersSlaChartProps) {
  return (
    <motion.section aria-label={ARIA_SLA_CHART} whileHover={{ y: -2 }} transition={{ duration: 0.25 }} className="ops-card glow-ring flex h-full flex-col p-6">
      <PanelHeader title={PANEL_ORDERS_SLA} subtitle={SLA_CHART_NOTE} badge="Live" />
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart key={data[data.length - 1]?.hour} data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_ORANGE_FILL} />
                <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_GRID} vertical={false} />
            <XAxis dataKey="hour" tick={{ fill: CHART_TICK, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="orders" tick={{ fill: CHART_TICK, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="breaches" orientation="right" tick={{ fill: CHART_TICK, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: CHART_TOOLTIP_BG,
                border: `1px solid ${CHART_TOOLTIP_BORDER}`,
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
            <Area
              yAxisId="orders"
              type="monotone"
              dataKey="ordersProcessed"
              name="Orders Processed"
              stroke={CHART_ORANGE}
              fill="url(#ordersFill)"
              strokeWidth={2}
            />
            <Line
              yAxisId="breaches"
              type="monotone"
              dataKey="slaBreaches"
              name="SLA Breaches"
              stroke={CHART_RED}
              strokeWidth={2.5}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
