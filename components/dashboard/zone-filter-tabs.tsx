"use client";

import { WAREHOUSE_ZONES } from "@/lib/simulation/constants";
import type { ZoneFilter } from "@/hooks/useZoneFilter";
import { opsBtn, opsBtnActive } from "@/lib/dashboard/ui-theme";

interface ZoneFilterTabsProps {
  value: ZoneFilter;
  onChange: (value: ZoneFilter) => void;
}

const tabs: ZoneFilter[] = ["All", ...WAREHOUSE_ZONES];

export function ZoneFilterTabs({ value, onChange }: ZoneFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={value === tab ? opsBtnActive : opsBtn}
        >
          {tab === "All" ? "All Zones" : tab.split("—")[0]?.trim()}
        </button>
      ))}
    </div>
  );
}
