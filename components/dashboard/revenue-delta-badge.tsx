"use client";

import { formatDelta } from "@/lib/formatters";

import { REVENUE_DELTA_NOTE } from "@/lib/dashboard/chart-notes";

interface RevenueDeltaBadgeProps {
  delta: number;
}

export function RevenueDeltaBadge({ delta }: RevenueDeltaBadgeProps) {
  return (
    <span
      className={`rounded-md border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${
        delta >= 0
          ? "border-lime-500/30 bg-lime-500/10 text-lime-300"
          : "border-red-500/30 bg-red-500/10 text-red-300"
      }`}
    >
      {formatDelta(delta, "%")} shift
    </span>
      <span className="sr-only">{REVENUE_DELTA_NOTE}</span>
  );
}
