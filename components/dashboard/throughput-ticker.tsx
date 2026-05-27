"use client";

interface ThroughputTickerProps {
  ordersProcessed: number;
  breaches: number;
}

export function ThroughputTicker({ ordersProcessed, breaches }: ThroughputTickerProps) {
  return (
    <div className="border-subtle flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-white/55">
      <span className="border-subtle accent-cyan font-mono tabular-nums">{ordersProcessed} orders/hr</span>
      <span className="border-subtle text-white/25">·</span>
      <span className="border-subtle accent-amber font-mono tabular-nums">{breaches} breaches</span>
    </div>
  );
}
