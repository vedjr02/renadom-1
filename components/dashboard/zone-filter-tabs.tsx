"use client";

import { WAREHOUSE_ZONES } from "@/lib/simulation/constants";
import type { WarehouseZone } from "@/lib/simulation/types";
import type { ZoneFilter } from "@/hooks/useZoneFilter";

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
          className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition ${
            value === tab
              ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
              : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white/70"
          }`}
        >
          {tab === "All" ? "All Zones" : tab.split("—")[0]?.trim()}
        </button>
      ))}
    </div>
  );
}
