import { LIVE_BADGE_LABEL } from "@/lib/dashboard/ui-copy";
export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-lime-500/30 bg-lime-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-lime-300">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
      </span>
      {LIVE_BADGE_LABEL}
    </span>
  );
}
