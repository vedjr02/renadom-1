"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLiveClock } from "@/hooks/useLiveClock";
import {
  formatSlaCountdown,
  getSlaProgress,
} from "@/hooks/useStoreSimulation";
import { PanelHeader } from "@/components/dashboard/panel-header";
import type { ActiveOrder } from "@/lib/simulation/types";

interface ActiveOrdersTableProps {
  orders: ActiveOrder[];
  lastUpdated: number;
}

const MotionTableRow = motion.create(TableRow);

function OrderRow({
  order,
  now,
}: {
  order: ActiveOrder;
  now: number;
}) {
  const countdown = formatSlaCountdown(order, now);
  const progress = getSlaProgress(order, now);

  return (
    <MotionTableRow
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={
        order.breached
          ? {
              opacity: 1,
              x: 0,
              backgroundColor: [
                "rgba(239, 68, 68, 0.06)",
                "rgba(239, 68, 68, 0.18)",
                "rgba(239, 68, 68, 0.06)",
              ],
            }
          : { opacity: 1, x: 0, backgroundColor: "rgba(255,255,255,0)" }
      }
      exit={{ opacity: 0, x: 12 }}
      transition={
        order.breached
          ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.35 }
      }
      className="border-white/[0.06] hover:bg-white/[0.03]"
    >
      <TableCell className="py-4 font-mono text-xs text-cyan-200/90">
        {order.id}
      </TableCell>
      <TableCell className="py-4 text-sm text-white/80">{order.zone}</TableCell>
      <TableCell className="py-4 text-sm text-white/80">{order.picker}</TableCell>
      <TableCell className="py-4">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/55">
          {order.category}
        </span>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex min-w-[140px] flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <span
              className={`font-mono text-sm tabular-nums ${
                order.breached ? "text-red-400" : "text-emerald-300"
              }`}
            >
              {order.breached ? "BREACHED" : countdown}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              SLA
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className={`h-full rounded-full ${
                order.breached
                  ? "bg-red-500"
                  : "bg-gradient-to-r from-emerald-400 to-cyan-400"
              }`}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
      </TableCell>
    </MotionTableRow>
  );
}

export function ActiveOrdersTable({ orders, lastUpdated }: ActiveOrdersTableProps) {
  const now = useLiveClock(1000);

  void lastUpdated;

  return (
    <section className="glass-panel glow-ring overflow-hidden p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold tracking-tight text-white">
            Operational Drill-down
          </h2>
          <p className="text-sm text-white/45">
            Active pick paths with live 10-minute SLA countdown
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.22em] text-white/35">
          {orders.length} orders tracked
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/[0.06] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow className="border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.02]">
              <TableHead className="text-white/45">Order ID</TableHead>
              <TableHead className="text-white/45">Zone</TableHead>
              <TableHead className="text-white/45">Picker</TableHead>
              <TableHead className="text-white/45">Category</TableHead>
              <TableHead className="text-white/45">SLA Timer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence initial={false}>
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} now={now} />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
