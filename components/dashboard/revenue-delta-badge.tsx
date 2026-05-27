"use client";

import { formatDelta } from "@/lib/formatters";

interface RevenueDeltaBadgeProps {
  delta: number;
}

export function RevenueDeltaBadge({ delta }: RevenueDeltaBadgeProps) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${
        delta >= 0
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
          : "border-red-400/20 bg-red-400/10 text-red-200"
      }`}
    >
      {formatDelta(delta, "%")} shift
    </span>
  );
}
