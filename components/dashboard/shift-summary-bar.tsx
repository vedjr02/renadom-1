"use client";

import { formatShiftElapsed } from "@/lib/formatters";
import { getAverageUtilization } from "@/lib/simulation/selectors";
import type { ZoneLoadMetric } from "@/lib/simulation/types";

interface ShiftSummaryBarProps {
  elapsedMinutes: number;
  zones: ZoneLoadMetric[];
  breachCount: number;
  revenueTotal: number;
}

export function ShiftSummaryBar({
  elapsedMinutes,
  zones,
  breachCount,
  revenueTotal,
}: ShiftSummaryBarProps) {
  const avgUtil = getAverageUtilization(zones);

  return (
    <section className="surface-muted flex flex-wrap items-center gap-4 px-5 py-4">
      <div>
        <p className="metric-label">Shift Elapsed</p>
        <p className="font-display mt-1 text-lg font-semibold text-white">{formatShiftElapsed(elapsedMinutes)}</p>
      </div>
      <div className="panel-divider hidden h-10 sm:block" />
      <div>
        <p className="metric-label">Avg Utilization</p>
        <p className="font-display mt-1 text-lg font-semibold accent-cyan">{Math.round(avgUtil)}%</p>
      </div>
      <div className="panel-divider hidden h-10 sm:block" />
      <div>
        <p className="metric-label">Active Breaches</p>
        <p className="font-display mt-1 text-lg font-semibold accent-amber">{breachCount}</p>
      </div>
      <div className="panel-divider hidden h-10 sm:block" />
      <div>
        <p className="metric-label">Shift Revenue</p>
        <p className="font-display mt-1 text-lg font-semibold text-white">${(revenueTotal / 1000).toFixed(0)}k</p>
      </div>
    </section>
  );
}
