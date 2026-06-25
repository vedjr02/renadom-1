"use client";

import { ARIA_COMPACT_TOGGLE } from "@/lib/dashboard/aria-labels";
import { COMPACT_OFF_LABEL, COMPACT_ON_LABEL } from "@/lib/dashboard/ui-copy";
import { opsBtn } from "@/lib/dashboard/ui-theme";

interface CompactModeToggleProps {
  compact: boolean;
  onToggle: () => void;
}

export function CompactModeToggle({ compact, onToggle }: CompactModeToggleProps) {
  return (
    <button
      aria-label={ARIA_COMPACT_TOGGLE}
      type="button"
      onClick={onToggle}
      className={opsBtn}
    >
      {compact ? COMPACT_ON_LABEL : COMPACT_OFF_LABEL}
    </button>
  );
}
