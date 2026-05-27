"use client";

interface SlaHealthGaugeProps {
  complianceRate: number;
}

export function SlaHealthGauge({ complianceRate }: SlaHealthGaugeProps) {
  const tone =
    complianceRate >= 95
      ? "text-emerald-300 border-emerald-400/20 bg-emerald-400/10"
      : complianceRate >= 90
        ? "text-amber-300 border-amber-400/20 bg-amber-400/10"
        : "text-red-300 border-red-400/20 bg-red-400/10";

  return (
    <div className={`rounded-2xl border px-4 py-3 ${tone}`}>
      <p className="metric-label">SLA Health</p>
      <p className="font-display mt-2 text-2xl font-bold">{complianceRate.toFixed(1)}%</p>
      <p className="mt-1 text-xs opacity-80">Target ≥ 95%</p>
    </div>
  );
}
