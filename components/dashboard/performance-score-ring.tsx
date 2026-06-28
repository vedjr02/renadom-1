"use client";

import { OPS_SCORE_NOTE } from "@/lib/dashboard/chart-notes";
import { OPS_SCORE_LABEL } from "@/lib/dashboard/ui-copy";

interface PerformanceScoreRingProps {
  score: number;
  label?: string;
}

export function PerformanceScoreRing({ score, label = OPS_SCORE_LABEL }: PerformanceScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="grid h-20 w-20 place-items-center rounded-full border border-orange-500/30 bg-orange-500/5"
        style={{
          background: `conic-gradient(rgba(249,115,22,0.85) ${clamped}%, rgba(39,39,42,0.8) 0)`,
        }}
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-zinc-950 text-sm font-semibold text-zinc-100">
          {Math.round(clamped)}
        </div>
      </div>
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="max-w-[140px] text-center text-[10px] text-zinc-600">{OPS_SCORE_NOTE}</p>
    </div>
  );
}
