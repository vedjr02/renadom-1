"use client";

import { EMPTY_FILTER_MESSAGE, FILTER_RESET_HINT, TABLE_EMPTY_TITLE } from "@/lib/dashboard/ui-copy";

export function FilterEmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-10 text-center text-sm text-zinc-500">
      <p className="font-display text-sm font-medium text-zinc-300">{TABLE_EMPTY_TITLE}</p><p>{EMPTY_FILTER_MESSAGE}</p>
      <p className="text-xs text-zinc-600">{FILTER_RESET_HINT}</p>
    </div>
  );
}
