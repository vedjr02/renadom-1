"use client";

interface ExportCsvButtonProps {
  disabled?: boolean;
}

export function ExportCsvButton({ disabled = false }: ExportCsvButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70 transition hover:border-cyan-400/30 hover:text-cyan-200 disabled:opacity-40"
    >
      Export CSV
    </button>
  );
}
