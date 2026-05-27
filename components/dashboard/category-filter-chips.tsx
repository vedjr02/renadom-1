"use client";

import type { CategoryFilter } from "@/hooks/useCategoryFilter";

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
          className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition ${
            value === chip
              ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
              : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white/70"
          }`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
