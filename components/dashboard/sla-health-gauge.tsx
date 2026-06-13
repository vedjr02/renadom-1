"use client";

import { opsLabel } from "@/lib/dashboard/ui-theme";

interface SlaHealthGaugeProps {
  complianceRate: number;
}

export function SlaHealthGauge({ complianceRate }: SlaHealthGaugeProps) {
  const tone =
    complianceRate >= 95
      ? "text-lime-300 border-lime-500/30 bg-lime-500/10"
      : complianceRate >= 90
        ? "text-amber-300 border-amber-500/30 bg-amber-500/10"
        : "text-red-300 border-red-500/30 bg-red-500/10";

  return (
    <div className={`rounded-md border px-4 py-3 ${tone}`}>
      <p className={opsLabel}>SLA Health</p>
      <p className="font-display mt-2 text-2xl font-bold">{complianceRate.toFixed(1)}%</p>
      <p className="mt-1 text-xs opacity-80">Target ≥ 95%</p>
    </div>
  );
}
