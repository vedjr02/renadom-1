"use client";

import { useMemo } from "react";
import type { ActiveOrder } from "@/lib/simulation/types";

export type OrderSortKey = "sla" | "age" | "priority";

const priorityRank = { VIP: 0, Express: 1, Standard: 2 } as const;

export function useSortedOrders(orders: ActiveOrder[], sortKey: OrderSortKey, now: number) {
  return useMemo(() => {
    const copy = [...orders];

    if (sortKey === "sla") {
      return copy.sort(
        (a, b) =>
          a.slaDeadlineMs -
          (now - a.startedAt) -
          (b.slaDeadlineMs - (now - b.startedAt)),
      );
    }

    if (sortKey === "age") {
      return copy.sort((a, b) => b.startedAt - a.startedAt);
    }

    return copy.sort(
      (a, b) => priorityRank[a.priority] - priorityRank[b.priority],
    );
  }, [orders, sortKey, now]);
}
