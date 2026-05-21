import {
  ORDER_CATEGORIES,
  PICKER_NAMES,
  SLA_DEADLINE_MS,
  WAREHOUSE_ZONES,
} from "./constants";
import type {
  ActiveOrder,
  HourlyMetric,
  KpiSnapshot,
  OrderCategory,
  RevenueSlice,
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

    return {
      hour: hour.toLocaleTimeString("en-IE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
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

export const spawnActiveOrder = (): ActiveOrder => {
  const startedAt =
    Date.now() - Math.round(randomBetween(0, SLA_DEADLINE_MS * 0.85));

  return {
    id: createOrderId(),
    zone: pickRandom(WAREHOUSE_ZONES),
    picker: pickRandom(PICKER_NAMES),
    category: pickRandom(ORDER_CATEGORIES),
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
