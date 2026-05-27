"use client";

import { useSimulationPause } from "@/hooks/useSimulationPause";
import { useEffect, useState } from "react";
import { SIMULATION_TICK_MS, SLA_DEADLINE_MS } from "@/lib/simulation/constants";
import {
  deriveZoneLoads,
  generateHourlyTrend,
  generateInitialKpis,
  generateInitialOrders,
  generateInitialZoneLoads,
  generateRevenueBreakdown,
  nudgeCategoryRevenue,
  spawnActiveOrder,
} from "@/lib/simulation/generators";
import type { ActiveOrder, StoreSimulationState } from "@/lib/simulation/types";

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

const withBreachedFlags = (orders: ActiveOrder[], now: number): ActiveOrder[] =>
  orders.map((order) => ({
    ...order,
    breached: now - order.startedAt >= order.slaDeadlineMs,
  }));

const buildInitialState = (): StoreSimulationState => ({
  kpis: generateInitialKpis(),
  hourlyTrend: generateHourlyTrend(),
  revenueBreakdown: generateRevenueBreakdown(),
  activeOrders: generateInitialOrders(),
  zoneLoads: generateInitialZoneLoads(),
  lastUpdated: Date.now(),
});

const tickSimulation = (prev: StoreSimulationState): StoreSimulationState => {
  const now = Date.now();
  let orders = withBreachedFlags(prev.activeOrders, now);

  if (Math.random() > 0.35) {
    orders = [...orders, spawnActiveOrder()];
  }

  if (orders.length > 22) {
    orders = orders.slice(orders.length - 22);
  }

  const hourlyTrend = [...prev.hourlyTrend.slice(1)];
  const latestHour = prev.hourlyTrend[prev.hourlyTrend.length - 1];
  const newOrdersProcessed =
    latestHour.ordersProcessed + Math.round(randomBetween(2, 8));
  const newBreaches = latestHour.slaBreaches + (Math.random() > 0.7 ? 1 : 0);

  hourlyTrend.push({
    hour: formatHourLabel(now),
    ordersProcessed: newOrdersProcessed,
    slaBreaches: newBreaches,
  });

  const completedCategory =
    prev.revenueBreakdown[
      Math.floor(Math.random() * prev.revenueBreakdown.length)
    ].name;

  return {
    kpis: {
      slaComplianceRate: Number(
        Math.max(
          86,
          Math.min(99, prev.kpis.slaComplianceRate + randomBetween(-0.4, 0.3)),
        ).toFixed(1),
      ),
      avgPickerTimeSec: Math.round(
        Math.max(
          118,
          Math.min(240, prev.kpis.avgPickerTimeSec + randomBetween(-6, 8)),
        ),
      ),
      inventoryWasteCost: Math.round(
        Math.max(620, prev.kpis.inventoryWasteCost + randomBetween(-18, 32)),
      ),
      activeOrders: orders.length,
      slaSparkline: [
        ...prev.kpis.slaSparkline.slice(1),
        prev.kpis.slaComplianceRate,
      ],
      pickerSparkline: [
        ...prev.kpis.pickerSparkline.slice(1),
        prev.kpis.avgPickerTimeSec,
      ],
      wasteSparkline: [
        ...prev.kpis.wasteSparkline.slice(1),
        prev.kpis.inventoryWasteCost,
      ],
      ordersSparkline: [
        ...prev.kpis.ordersSparkline.slice(1),
        orders.length,
      ],
    },
    hourlyTrend,
    revenueBreakdown: nudgeCategoryRevenue(
      prev.revenueBreakdown,
      completedCategory,
    ),
    activeOrders: orders,
    zoneLoads: deriveZoneLoads(orders),
    lastUpdated: now,
  };
};

export const formatHourLabel = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatSlaCountdown = (
  order: ActiveOrder,
  now: number,
): string => {
  const remainingMs = Math.max(
    0,
    order.slaDeadlineMs - (now - order.startedAt),
  );
  const totalSeconds = Math.floor(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const getSlaProgress = (order: ActiveOrder, now: number): number => {
  const elapsed = now - order.startedAt;
  return Math.max(
    0,
    Math.min(100, ((order.slaDeadlineMs - elapsed) / order.slaDeadlineMs) * 100),
  );
};

export const useStoreSimulation = () => {
  const [state, setState] = useState<StoreSimulationState | null>(null);

  useEffect(() => {
    setState(buildInitialState());

    const interval = setInterval(() => {
      setState((prev) => (prev ? tickSimulation(prev) : buildInitialState()));
    }, SIMULATION_TICK_MS);

    return () => clearInterval(interval);
  }, []);

  return {
    isReady: state !== null,
    kpis: state?.kpis ?? null,
    hourlyTrend: state?.hourlyTrend ?? [],
    revenueBreakdown: state?.revenueBreakdown ?? [],
    activeOrders: state?.activeOrders ?? [],
    zoneLoads: state?.zoneLoads ?? [],
    lastUpdated: state?.lastUpdated ?? 0,
    slaDeadlineMs: SLA_DEADLINE_MS,
  };
};
