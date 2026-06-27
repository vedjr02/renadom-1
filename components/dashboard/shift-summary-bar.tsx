"use client";

import { formatShiftElapsed } from "@/lib/formatters";
import { getAverageUtilization } from "@/lib/simulation/selectors";
import type { ZoneLoadMetric } from "@/lib/simulation/types";
import { AVG_UTIL_LABEL, BREACH_COUNT_LABEL, REVENUE_LABEL, SHIFT_LABEL } from "@/lib/dashboard/ui-copy";
import { opsLabel } from "@/lib/dashboard/ui-theme";

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
    <section className="ops-panel flex flex-wrap items-center gap-4 px-5 py-4">
      <div>
        <p className={opsLabel}>{SHIFT_LABEL}</p>
        <p className="font-display mt-1 text-lg font-semibold text-zinc-100">{formatShiftElapsed(elapsedMinutes)}</p>
      </div>
      <div className="hidden h-10 w-px bg-zinc-800 sm:block" />
      <div>
        <p className={opsLabel}>{AVG_UTIL_LABEL}</p>
        <p className="font-display mt-1 text-lg font-semibold text-orange-400">{Math.round(avgUtil)}%</p>
      </div>
      <div className="hidden h-10 w-px bg-zinc-800 sm:block" />
      <div>
        <p className={opsLabel}>Active Breaches</p>
        <p className="font-display mt-1 text-lg font-semibold text-amber-400">{breachCount}</p>
      </div>
      <div className="hidden h-10 w-px bg-zinc-800 sm:block" />
      <div>
        <p className={opsLabel}>Shift Revenue</p>
        <p className="font-display mt-1 text-lg font-semibold text-zinc-100">${(revenueTotal / 1000).toFixed(0)}k</p>
      </div>
    </section>
  );
}
