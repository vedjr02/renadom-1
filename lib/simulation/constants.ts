import type { OrderCategory, WarehouseZone } from "./types";

export const SLA_DEADLINE_MS = 10 * 60 * 1000;

export const WAREHOUSE_ZONES: WarehouseZone[] = [
  "Zone A — Cold Chain",
  "Zone B — Ambient",
  "Zone C — High-Velocity",
];

export const ORDER_CATEGORIES: OrderCategory[] = [
  "Groceries",
  "Electronics",
  "FMCG",
];

export const PICKER_NAMES = [
  "Maya Chen",
  "James O'Brien",
  "Priya Nair",
  "Luca Rossi",
  "Aisha Khan",
  "Noah Walsh",
  "Elena Petrova",
  "Sam Okonkwo",
];

export const SIMULATION_TICK_MS = 2000;
