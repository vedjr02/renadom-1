interface StatPillProps {
  label: string;
  value: string;
}

export function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">{label}</p>
      <p className="mt-1 font-[family-name:var(--font-syne)] text-lg font-semibold text-white/90">
        {value}
      </p>
    </div>
  );
}
