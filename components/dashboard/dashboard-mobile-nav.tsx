"use client";

import { NAV_ITEMS } from "@/lib/dashboard/nav-items";

export function DashboardMobileNav() {
  return (
    <nav className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium ${
            item.active
              ? "bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/30"
              : "bg-zinc-900 text-zinc-500 ring-1 ring-zinc-800"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
