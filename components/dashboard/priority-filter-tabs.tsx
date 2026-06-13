"use client";

import type { PriorityFilter } from "@/hooks/usePriorityFilter";
import { opsBtn, opsBtnActive } from "@/lib/dashboard/ui-theme";

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
          className={value === tab ? opsBtnActive : opsBtn}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
