interface StatPillProps {
  label: string;
  value: string;
}

export function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="ops-card rounded-md px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="font-display mt-1 text-lg font-semibold text-zinc-100">{value}</p>
    </div>
  );
}
