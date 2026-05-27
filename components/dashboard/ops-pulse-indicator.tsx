"use client";

interface OpsPulseIndicatorProps {
  paused: boolean;
}

export function OpsPulseIndicator({ paused }: OpsPulseIndicatorProps) {
  return (
    <span className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] ${paused ? "text-amber-200/80" : "text-emerald-200/80"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${paused ? "bg-amber-300" : "bg-emerald-300 animate-pulse"}`} />
      {paused ? "Ops Pulse Paused" : "Ops Pulse Live"}
    </span>
  );
}
