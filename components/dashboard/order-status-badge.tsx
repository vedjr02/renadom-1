"use client";

import { statusColors } from "@/lib/dashboard/status-colors";
import type { OrderStatus } from "@/lib/simulation/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={`rounded-md border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}
