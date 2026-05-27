"use client";

import { useState } from "react";
import type { OrderCategory } from "@/lib/simulation/types";

export type CategoryFilter = "All" | OrderCategory;

export function useCategoryFilter() {
  const [category, setCategory] = useState<CategoryFilter>("All");

  return { category, setCategory, isFiltered: category !== "All" };
}
