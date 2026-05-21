"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSlaCountdown } from "@/hooks/useStoreSimulation";
import type { ActiveOrder } from "@/lib/simulation/types";

interface ActiveOrdersTableProps {
  orders: ActiveOrder[];
  lastUpdated: number;
}

function OrderRow({
  order,
  lastUpdated,
}: {
  order: ActiveOrder;
  lastUpdated: number;
}) {
  const countdown = useSlaCountdown(order, lastUpdated);

  return (
    <motion.tr
      animate={
        order.breached
          ? {
              backgroundColor: [
                "rgba(239, 68, 68, 0.08)",
                "rgba(239, 68, 68, 0.22)",
                "rgba(239, 68, 68, 0.08)",
              ],
            }
          : { backgroundColor: "transparent" }
      }
      transition={
        order.breached
          ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }
      }
      className="border-white/5"
    >
      <TableCell className="font-mono text-xs text-primary">{order.id}</TableCell>
      <TableCell className="text-sm">{order.zone}</TableCell>
      <TableCell className="text-sm">{order.picker}</TableCell>
      <TableCell className="text-sm text-muted-foreground">{order.category}</TableCell>
      <TableCell
        className={`font-mono text-sm tabular-nums ${
          order.breached ? "text-red-400" : "text-emerald-300"
        }`}
      >
        {order.breached ? "BREACHED" : countdown}
      </TableCell>
    </motion.tr>
  );
}

export function ActiveOrdersTable({ orders, lastUpdated }: ActiveOrdersTableProps) {
  return (
    <section className="glass-panel p-6">
      <div className="mb-6 space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">
          Operational Drill-down
        </h2>
        <p className="text-sm text-muted-foreground">
          Live active orders with 10-minute SLA countdown per pick path
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/8">
        <Table>
          <TableHeader>
            <TableRow className="border-white/8 hover:bg-transparent">
              <TableHead>Order ID</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Picker</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>SLA Timer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} lastUpdated={lastUpdated} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
