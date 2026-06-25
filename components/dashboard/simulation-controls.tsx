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
      aria-label="Pause or resume live simulation stream"
      type="button"
      onClick={onToggle}
      className={opsBtn}
    >
      {paused ? RESUME_LABEL : PAUSE_LABEL}
    </button>
  );
}
