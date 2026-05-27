"use client";

interface SimulationControlsProps {
  paused: boolean;
  onToggle: () => void;
}

export function SimulationControls({ paused, onToggle }: SimulationControlsProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="ring-subtle rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70 transition hover:border-cyan-400/30 hover:text-cyan-200"
    >
      {paused ? "Resume Stream" : "Pause Stream"}
    </button>
  );
}
