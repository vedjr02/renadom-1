"use client";

import { useState } from "react";
import type { OrderPriority } from "@/lib/simulation/types";

export type PriorityFilter = "All" | OrderPriority;

export function usePriorityFilter() {
  const [priority, setPriority] = useState<PriorityFilter>("All");

  return { priority, setPriority, isFiltered: priority !== "All" };
}
