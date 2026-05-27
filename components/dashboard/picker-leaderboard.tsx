"use client";

import type { ActiveOrder } from "@/lib/simulation/types";

interface PickerLeaderboardProps {
  orders: ActiveOrder[];
}

export function PickerLeaderboard({ orders }: PickerLeaderboardProps) {
  const counts = orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.picker] = (acc[order.picker] ?? 0) + 1;
    return acc;
  }, {});

  const top = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="glass-panel p-4">
      <p className="metric-label">Top Pickers</p>
      <ul className="mt-3 space-y-2">
        {top.map(([picker, count], index) => (
          <li key={picker} className="flex items-center justify-between text-sm text-white/75">
            <span>{index + 1}. {picker}</span>
            <span className="font-mono text-xs accent-cyan">{count} orders</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
