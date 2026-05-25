import type { WarehouseZone } from "@/lib/simulation/types";

export const zoneAccentColors: Record<WarehouseZone, string> = {
  "Zone A — Cold Chain": "from-cyan-400/30 to-cyan-400/5",
  "Zone B — Ambient": "from-violet-400/30 to-violet-400/5",
  "Zone C — High-Velocity": "from-emerald-400/30 to-emerald-400/5",
};
