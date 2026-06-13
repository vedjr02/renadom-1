interface PanelHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export function PanelHeader({ title, subtitle, badge }: PanelHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h2 className="font-display text-lg font-semibold tracking-tight text-zinc-50">{title}</h2>
        <p className="text-sm text-zinc-500">{subtitle}</p>
      </div>
      {badge ? (
        <span className="rounded-md border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-orange-300">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
