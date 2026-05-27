"use client";

import { useMemo, useState } from "react";
import type { WarehouseZone } from "@/lib/simulation/types";

export type ZoneFilter = "All" | WarehouseZone;

export function useZoneFilter() {
  const [filter, setFilter] = useState<ZoneFilter>("All");

  return {
    filter,
    setFilter,
    isFiltered: filter !== "All",
    label: useMemo(() => (filter === "All" ? "All Zones" : filter), [filter]),
  };
}
