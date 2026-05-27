import { ORDER_CATEGORIES, ORDER_PRIORITIES, ORDER_STATUSES, PICKER_NAMES, SLA_DEADLINE_MS, WAREHOUSE_ZONES } from "./constants";
import type { OrderPriority } from "./types";
import type {
  ActiveOrder,
  HourlyMetric,
  KpiSnapshot,
  OrderCategory,
  OrderStatus,
  RevenueSlice,
  ZoneLoadMetric,
} from "./types";

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

const pickRandom = <T,>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)];

export const createOrderId = (): string =>
  `ORD-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

export const generateHourlyTrend = (): HourlyMetric[] => {
  const now = new Date();

  return Array.from({ length: 12 }, (_, index) => {
    const hour = new Date(now.getTime() - (11 - index) * 60 * 60 * 1000);
    const ordersProcessed = Math.round(randomBetween(38, 92));
    const slaBreaches = Math.round(ordersProcessed * randomBetween(0.02, 0.12));
    const h = hour.getHours().toString().padStart(2, "0");
    const m = hour.getMinutes().toString().padStart(2, "0");

    return {
      hour: `${h}:${m}`,
      ordersProcessed,
      slaBreaches,
    };
  });
};

export const generateRevenueBreakdown = (): RevenueSlice[] => [
  { name: "Groceries", value: Math.round(randomBetween(42000, 52000)) },
  { name: "Electronics", value: Math.round(randomBetween(18000, 28000)) },
  { name: "FMCG", value: Math.round(randomBetween(24000, 34000)) },
];

export const generateSparkline = (base: number, variance: number): number[] =>
  Array.from({ length: 12 }, () =>
    Math.round(base + randomBetween(-variance, variance)),
  );

export const generateInitialKpis = (): KpiSnapshot => ({
  slaComplianceRate: Number(randomBetween(91, 97).toFixed(1)),
  avgPickerTimeSec: Math.round(randomBetween(142, 198)),
  inventoryWasteCost: Math.round(randomBetween(840, 1320)),
  activeOrders: Math.round(randomBetween(18, 32)),
  slaSparkline: generateSparkline(94, 3),
  pickerSparkline: generateSparkline(168, 18),
  wasteSparkline: generateSparkline(980, 120),
  ordersSparkline: generateSparkline(24, 6),
});

const pickWeightedPriority = (): OrderPriority => {
  const roll = Math.random();
  if (roll > 0.92) return "VIP";
  if (roll > 0.72) return "Express";
  return "Standard";
};

export const spawnActiveOrder = (): ActiveOrder => {
  const startedAt =
    Date.now() - Math.round(randomBetween(0, SLA_DEADLINE_MS * 0.85));

  return {
    id: createOrderId(),
    zone: pickRandom(WAREHOUSE_ZONES),
    picker: pickRandom(PICKER_NAMES),
    category: pickRandom(ORDER_CATEGORIES),
    priority: pickWeightedPriority(),
    status: pickRandom(ORDER_STATUSES),
    startedAt,
    slaDeadlineMs: SLA_DEADLINE_MS,
    breached: false,
  };
};

export const generateInitialOrders = (count = 14): ActiveOrder[] =>
  Array.from({ length: count }, spawnActiveOrder);

export const nudgeCategoryRevenue = (
  slices: RevenueSlice[],
  category: OrderCategory,
): RevenueSlice[] =>
  slices.map((slice) =>
    slice.name === category
      ? { ...slice, value: slice.value + Math.round(randomBetween(40, 180)) }
      : slice,
  );

const breachRiskFromUtilization = (
  utilization: number,
): ZoneLoadMetric["breachRisk"] => {
  if (utilization >= 82) return "High";
  if (utilization >= 58) return "Med";
  return "Low";
};

export const deriveZoneLoads = (orders: ActiveOrder[]): ZoneLoadMetric[] =>
  WAREHOUSE_ZONES.map((zone) => {
    const ordersInZone = orders.filter((order) => order.zone === zone).length;
    const breachedInZone = orders.filter(
      (order) => order.zone === zone && order.breached,
    ).length;
    const utilization = Math.min(
      98,
      Math.round(ordersInZone * 11 + breachedInZone * 9 + randomBetween(8, 24)),
    );

    return {
      zone,
      utilization,
      ordersInZone,
      breachRisk: breachRiskFromUtilization(utilization),
    };
  });

export const generateInitialZoneLoads = (): ZoneLoadMetric[] =>
  WAREHOUSE_ZONES.map((zone) => ({
    zone,
    utilization: Math.round(randomBetween(42, 88)),
    ordersInZone: Math.round(randomBetween(3, 11)),
    breachRisk: breachRiskFromUtilization(randomBetween(42, 88)),
  }));
