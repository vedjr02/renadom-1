interface PanelHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export function PanelHeader({ title, subtitle, badge }: PanelHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        <p className="text-sm text-white/45">{subtitle}</p>
      </div>
      {badge ? (
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200/80">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
