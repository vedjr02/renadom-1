"use client";

import { Activity, BarChart3, Boxes, FileText } from "lucide-react";
import { NAV_ITEMS } from "@/lib/dashboard/nav-items";
import { opsAccent, opsLabel } from "@/lib/dashboard/ui-theme";

const icons = [Activity, Boxes, BarChart3, FileText] as const;

export function DashboardSidebar() {
  return (
    <aside className="ops-sidebar hidden w-56 shrink-0 flex-col px-4 py-8 lg:flex">
      <div className="mb-10 px-2">
        <p className={`${opsLabel} ${opsAccent}`}>Forge Ops</p>
        <h2 className="font-display mt-2 text-lg font-bold text-zinc-50">Dark Store</h2>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item, i) => {
          const Icon = icons[i] ?? Activity;
          return (
            <button
              key={item.id}
              type="button"
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
                item.active
                  ? "border border-orange-500/30 bg-orange-500/10 text-orange-300"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-3">
        <p className={opsLabel}>Shift Mode</p>
        <p className="mt-1 text-xs text-zinc-400">Live simulation · 3 zones</p>
      </div>
    </aside>
  );
}
