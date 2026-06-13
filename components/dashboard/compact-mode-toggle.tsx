"use client";

import { opsBtn } from "@/lib/dashboard/ui-theme";

interface CompactModeToggleProps {
  compact: boolean;
  onToggle: () => void;
}

export function CompactModeToggle({ compact, onToggle }: CompactModeToggleProps) {
  return (
    <button
      aria-label="Toggle compact table density"
      type="button"
      onClick={onToggle}
      className={opsBtn}
    >
      {compact ? "Comfort View" : "Compact View"}
    </button>
  );
}
