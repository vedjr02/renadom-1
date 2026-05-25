export type WarehouseZone = "Zone A — Cold Chain" | "Zone B — Ambient" | "Zone C — High-Velocity";

export type OrderCategory = "Groceries" | "Electronics" | "FMCG";

export type OrderPriority = "Standard" | "Express" | "VIP";

export interface ActiveOrder {
  id: string;
  zone: WarehouseZone;
  picker: string;
  category: OrderCategory;
  priority: OrderPriority;
  startedAt: number;
  slaDeadlineMs: number;
  breached: boolean;
}

export interface HourlyMetric {
  hour: string;
  ordersProcessed: number;
  slaBreaches: number;
}

export interface RevenueSlice {
  name: OrderCategory;
  value: number;
}

export interface KpiSnapshot {
  slaComplianceRate: number;
  avgPickerTimeSec: number;
  inventoryWasteCost: number;
  activeOrders: number;
  slaSparkline: number[];
  pickerSparkline: number[];
  wasteSparkline: number[];
  ordersSparkline: number[];
}

export interface ZoneLoadMetric {
  zone: WarehouseZone;
  utilization: number;
  ordersInZone: number;
  breachRisk: "Low" | "Med" | "High";
}

export interface StoreSimulationState {
  kpis: KpiSnapshot;
  hourlyTrend: HourlyMetric[];
  revenueBreakdown: RevenueSlice[];
  activeOrders: ActiveOrder[];
  zoneLoads: ZoneLoadMetric[];
  lastUpdated: number;
}
