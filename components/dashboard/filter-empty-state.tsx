"use client";

import { EMPTY_FILTER_MESSAGE } from "@/lib/dashboard/ui-copy";

export function FilterEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center text-sm text-white/45">
      {EMPTY_FILTER_MESSAGE}
    </div>
  );
}
