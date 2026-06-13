"use client";

interface ThroughputTickerProps {
  ordersProcessed: number;
  breaches: number;
}

export function ThroughputTicker({ ordersProcessed, breaches }: ThroughputTickerProps) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-400">
      <span className="font-mono tabular-nums text-orange-400">{ordersProcessed} orders/hr</span>
      <span className="text-zinc-700">·</span>
      <span className="font-mono tabular-nums text-amber-400">{breaches} breaches</span>
    </div>
  );
}
