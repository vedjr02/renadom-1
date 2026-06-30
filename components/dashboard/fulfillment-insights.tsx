"use client";

import { DISPATCH_STAGE_LABEL, PACKING_STAGE_LABEL, PICKING_STAGE_LABEL, PIPELINE_LABEL } from "@/lib/dashboard/ui-copy";
import { opsLabel } from "@/lib/dashboard/ui-theme";

interface FulfillmentInsightsProps {
  picking: number;
  packing: number;
  dispatch: number;
}

export function FulfillmentInsights({ picking, packing, dispatch }: FulfillmentInsightsProps) {
  const total = Math.max(1, picking + packing + dispatch);

  const rows = [
    { label: PICKING_STAGE_LABEL, value: picking, tone: "bg-orange-500" },
    { label: PACKING_STAGE_LABEL, value: packing, tone: "bg-amber-500" },
    { label: DISPATCH_STAGE_LABEL, value: dispatch, tone: "bg-lime-500" },
  ];

  return (
    <section className="ops-card p-5">
      <p className={opsLabel}>{PIPELINE_LABEL}</p>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex items-center justify-between text-xs text-zinc-400">
              <span>{row.label}</span>
              <span className="font-mono">{row.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <div className={`h-full rounded-full ${row.tone}`} style={{ width: `${(row.value / total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
