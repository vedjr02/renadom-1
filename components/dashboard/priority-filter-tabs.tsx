"use client";

import type { PriorityFilter } from "@/hooks/usePriorityFilter";

interface PriorityFilterTabsProps {
  value: PriorityFilter;
  onChange: (value: PriorityFilter) => void;
}

const tabs: PriorityFilter[] = ["All", "Standard", "Express", "VIP"];

export function PriorityFilterTabs({ value, onChange }: PriorityFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition ${
            value === tab
              ? "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200"
              : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white/70"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
