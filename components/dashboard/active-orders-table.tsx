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
import { formatSlaCountdown, getSlaProgress } from "@/hooks/useStoreSimulation";
import { FilterEmptyState } from "@/components/dashboard/filter-empty-state";
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge";
import { OrderAgeCell } from "@/components/dashboard/order-age-cell";
import { PanelHeader } from "@/components/dashboard/panel-header";
import { categoryColors } from "@/lib/dashboard/category-colors";
import { pickerInitials } from "@/lib/dashboard/picker-initials";
import { priorityStyles } from "@/lib/dashboard/priority-styles";
import { opsTableHead } from "@/lib/dashboard/ui-theme";
import type { ActiveOrder } from "@/lib/simulation/types";

interface ActiveOrdersTableProps {
  orders: ActiveOrder[];
  lastUpdated: number;
  now?: number;
  compact?: boolean;
}

const MotionTableRow = motion.create(TableRow);

function OrderRow({ order, now, compact }: { order: ActiveOrder; now: number; compact: boolean }) {
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
              backgroundColor: ["rgba(239, 68, 68, 0.06)", "rgba(239, 68, 68, 0.18)", "rgba(239, 68, 68, 0.06)"],
            }
          : { opacity: 1, x: 0, backgroundColor: "rgba(0,0,0,0)" }
      }
      exit={{ opacity: 0, x: 12 }}
      transition={order.breached ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.35 }}
      className="border-zinc-800 hover:bg-zinc-900/50"
    >
      <TableCell className={`${compact ? "py-2" : "py-4"} font-mono text-xs text-orange-400`}>{order.id}</TableCell>
      <TableCell className="py-4 text-sm text-zinc-300">{order.zone}</TableCell>
      <TableCell className="py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-[10px] font-semibold text-orange-300">
            {pickerInitials(order.picker)}
          </span>
          <span className="text-sm text-zinc-300">{order.picker}</span>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <span className={`rounded-md border px-2.5 py-1 text-xs ${categoryColors[order.category]}`}>{order.category}</span>
      </TableCell>
      <TableCell className="py-4">
        <span className={`rounded-md border px-2.5 py-1 text-xs ${priorityStyles[order.priority]}`}>{order.priority}</span>
      </TableCell>
      <TableCell className="py-4">
        <OrderStatusBadge status={order.status} />
      </TableCell>
      <TableCell className="py-4">
        <OrderAgeCell startedAt={order.startedAt} now={now} />
      </TableCell>
      <TableCell className="py-4">
        <div className="flex min-w-[140px] flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className={`font-mono text-sm tabular-nums ${order.breached ? "text-red-400" : "text-lime-400"}`}>
              {order.breached ? "BREACHED" : countdown}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">SLA</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              className={`h-full rounded-full ${order.breached ? "bg-red-500" : "bg-gradient-to-r from-lime-500 to-orange-500"}`}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
      </TableCell>
    </MotionTableRow>
  );
}

export function ActiveOrdersTable({ orders, lastUpdated, now: nowProp, compact = false }: ActiveOrdersTableProps) {
  const liveNow = useLiveClock(1000);
  const now = nowProp ?? liveNow;
  void lastUpdated;

  return (
    <section className="ops-card glow-ring overflow-hidden p-6">
      <PanelHeader
        title="Operational Drill-down"
        subtitle="Active pick paths with live 10-minute SLA countdown"
        badge={`${orders.length} tracked`}
      />
      <div className="overflow-x-auto rounded-md border border-zinc-800 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {orders.length === 0 ? (
          <FilterEmptyState />
        ) : (
          <Table className="ops-zebra min-w-[920px]">
            <TableHeader>
              <TableRow className="border-zinc-800 bg-zinc-900/80 hover:bg-zinc-900/80">
                <TableHead className={opsTableHead}>Order ID</TableHead>
                <TableHead className={opsTableHead}>Zone</TableHead>
                <TableHead className={opsTableHead}>Picker</TableHead>
                <TableHead className={opsTableHead}>Category</TableHead>
                <TableHead className={opsTableHead}>Priority</TableHead>
                <TableHead className={opsTableHead}>Status</TableHead>
                <TableHead className={opsTableHead}>Age</TableHead>
                <TableHead className={opsTableHead}>SLA Timer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence initial={false}>
                {orders.map((order) => (
                  <OrderRow key={order.id} order={order} now={now} compact={compact} />
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
