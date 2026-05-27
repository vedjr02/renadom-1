"use client";

import { formatOrderAge } from "@/lib/formatters";
import { getOrderAgeMinutes } from "@/lib/dashboard/order-age";

interface OrderAgeCellProps {
  startedAt: number;
  now: number;
}

export function OrderAgeCell({ startedAt, now }: OrderAgeCellProps) {
  const age = getOrderAgeMinutes(startedAt, now);

  return (
    <span className={`font-mono text-xs tabular-nums ${age >= 8 ? "accent-amber" : "text-white/55"}`}>
      {formatOrderAge(age)}
    </span>
  );
}
