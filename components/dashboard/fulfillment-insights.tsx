"use client";

interface FulfillmentInsightsProps {
  picking: number;
  packing: number;
  dispatch: number;
}

export function FulfillmentInsights({ picking, packing, dispatch }: FulfillmentInsightsProps) {
  const total = Math.max(1, picking + packing + dispatch);

  const rows = [
    { label: "Picking", value: picking, tone: "bg-cyan-400" },
    { label: "Packing", value: packing, tone: "bg-violet-400" },
    { label: "Dispatch", value: dispatch, tone: "bg-emerald-400" },
  ];

  return (
    <section className="glass-panel p-5">
      <p className="metric-label">Fulfillment Pipeline</p>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex items-center justify-between text-xs text-white/60">
              <span>{row.label}</span>
              <span className="font-mono">{row.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={`h-full rounded-full ${row.tone}`}
                style={{ width: `${(row.value / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
