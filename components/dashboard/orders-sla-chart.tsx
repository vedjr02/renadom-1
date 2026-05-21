"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HourlyMetric } from "@/lib/simulation/types";

interface OrdersSlaChartProps {
  data: HourlyMetric[];
}

export function OrdersSlaChart({ data }: OrdersSlaChartProps) {
  return (
    <section className="glass-panel flex h-full flex-col p-6">
      <div className="mb-6 space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">
          Orders Processed vs. SLA Breaches
        </h2>
        <p className="text-sm text-muted-foreground">
          Rolling 12-hour throughput with breach overlay
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="oklch(1 0 0 / 6%)" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={{ fill: "oklch(0.68 0.03 260)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="orders"
              tick={{ fill: "oklch(0.68 0.03 260)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="breaches"
              orientation="right"
              tick={{ fill: "oklch(0.68 0.03 260)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(0.18 0.02 260 / 92%)",
                border: "1px solid oklch(1 0 0 / 10%)",
                borderRadius: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
            <Line
              yAxisId="orders"
              type="monotone"
              dataKey="ordersProcessed"
              name="Orders Processed"
              stroke="oklch(0.78 0.14 195)"
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              yAxisId="breaches"
              type="monotone"
              dataKey="slaBreaches"
              name="SLA Breaches"
              stroke="oklch(0.62 0.22 25)"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
