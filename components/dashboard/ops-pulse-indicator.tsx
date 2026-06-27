"use client";

import { MOCK_STREAM_LABEL } from "@/lib/dashboard/ui-copy";

interface OpsPulseIndicatorProps {
  paused: boolean;
}

export function OpsPulseIndicator({ paused }: OpsPulseIndicatorProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] ${
        paused ? "text-amber-400" : "text-lime-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          paused ? "bg-amber-400" : "animate-pulse bg-lime-400"
        }`}
      />
      {paused ? "Ops Pulse Paused" : MOCK_STREAM_LABEL}
    </span>
  );
}
