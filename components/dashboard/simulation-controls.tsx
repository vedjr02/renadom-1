"use client";

import { ARIA_PAUSE_SIM } from "@/lib/dashboard/aria-labels";
import { PAUSE_LABEL, RESUME_LABEL } from "@/lib/dashboard/ui-copy";
import { opsBtn } from "@/lib/dashboard/ui-theme";

interface SimulationControlsProps {
  paused: boolean;
  onToggle: () => void;
}

export function SimulationControls({ paused, onToggle }: SimulationControlsProps) {
  return (
    <button
      aria-label={ARIA_PAUSE_SIM}
      type="button"
      onClick={onToggle}
      className={opsBtn}
    >
      {paused ? RESUME_LABEL : PAUSE_LABEL}
    </button>
  );
}
