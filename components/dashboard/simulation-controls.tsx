"use client";

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
      {paused ? "Resume Stream" : "Pause Stream"}
    </button>
  );
}
