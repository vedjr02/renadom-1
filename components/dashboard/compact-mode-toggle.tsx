"use client";

interface CompactModeToggleProps {
  compact: boolean;
  onToggle: () => void;
}

export function CompactModeToggle({ compact, onToggle }: CompactModeToggleProps) {
  return (
    <button aria-label="Toggle compact table density"
      type="button"
      onClick={onToggle}
      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70 transition hover:border-violet-400/30 hover:text-violet-200"
    >
      {compact ? "Comfort View" : "Compact View"}
    </button>
  );
}
