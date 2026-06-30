"use client";

import type { ActiveOrder } from "@/lib/simulation/types";
import { LEADERBOARD_RANK_NOTE } from "@/lib/dashboard/chart-notes";
import { TOP_PICKERS_LABEL } from "@/lib/dashboard/ui-copy";
import { opsLabel } from "@/lib/dashboard/ui-theme";

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
    <div className="ops-card p-4">
      <p className={opsLabel}>{TOP_PICKERS_LABEL}</p>
      <p className="mt-1 text-xs text-zinc-600">{LEADERBOARD_RANK_NOTE}</p>
      <ul className="mt-3 space-y-2">
        {top.map(([picker, count], index) => (
          <li key={picker} className="flex items-center justify-between text-sm text-zinc-300">
            <span>
              {index + 1}. {picker}
            </span>
            <span className="font-mono text-xs text-orange-400">{count} orders</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
