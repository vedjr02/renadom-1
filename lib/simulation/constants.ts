import type { OrderCategory, OrderPriority, OrderStatus, WarehouseZone } from "./types";

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

export const ORDER_PRIORITIES: OrderPriority[] = ["Standard", "Express", "VIP"];

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

export const SHIFT_START_HOUR = 6;

export const MAX_ACTIVE_ORDERS = 22;

export const TICKS_PER_MINUTE = 30;

export const ORDER_STATUSES: OrderStatus[] = ["Picking", "Packing", "Dispatch"];
