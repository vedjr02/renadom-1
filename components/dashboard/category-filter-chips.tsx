"use client";

import type { CategoryFilter } from "@/hooks/useCategoryFilter";
import { opsBtn, opsBtnActive } from "@/lib/dashboard/ui-theme";

interface CategoryFilterChipsProps {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
}

const chips: CategoryFilter[] = ["All", "Groceries", "Electronics", "FMCG"];

export function CategoryFilterChips({ value, onChange }: CategoryFilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onChange(chip)}
          className={value === chip ? opsBtnActive : opsBtn}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
