"use client";

interface PerformanceScoreRingProps {
  score: number;
  label: string;
}

export function PerformanceScoreRing({ score, label }: PerformanceScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="grid h-20 w-20 place-items-center rounded-full border border-cyan-400/20 bg-cyan-400/5"
        style={{ background: `conic-gradient(rgba(34,211,238,0.8) ${clamped}%, rgba(255,255,255,0.06) 0)` }}
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#0a0c12] text-sm font-semibold text-white">
          {Math.round(clamped)}
        </div>
      </div>
      <p className="metric-label">{label}</p>
    </div>
  );
}
