import type { WarehouseZone } from "@/lib/simulation/types";

export const zoneAccentColors: Record<WarehouseZone, string> = {
  "Zone A — Cold Chain": "border-l-orange-500 bg-orange-500/5",
  "Zone B — Ambient": "border-l-zinc-400 bg-zinc-800/40",
  "Zone C — High-Velocity": "border-l-lime-500 bg-lime-500/5",
};
