"use client";

import { statusColors } from "@/lib/dashboard/status-colors";
import type { OrderStatus } from "@/lib/simulation/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs ${statusColors[status]}`}>
      {status}
    </span>
  );
}
