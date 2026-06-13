"use client";

import { EMPTY_FILTER_MESSAGE } from "@/lib/dashboard/ui-copy";

export function FilterEmptyState() {
  return (
    <div className="rounded-md border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-10 text-center text-sm text-zinc-500">
      {EMPTY_FILTER_MESSAGE}
    </div>
  );
}
