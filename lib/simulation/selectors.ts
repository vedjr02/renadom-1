import type { ActiveOrder } from "./types";

export const countBreachedOrders = (orders: ActiveOrder[]): number =>
  orders.filter((order) => order.breached).length;

export const countActiveByZone = (
  orders: ActiveOrder[],
  zone: ActiveOrder["zone"],
): number => orders.filter((order) => order.zone === zone).length;

export const countExpressOrders = (orders: ActiveOrder[]): number =>
  orders.filter((order) => order.priority === "Express").length;

export const countVipOrders = (orders: ActiveOrder[]): number =>
  orders.filter((order) => order.priority === "VIP").length;

export const getTotalRevenue = (slices: { value: number }[]): number =>
  slices.reduce((sum, slice) => sum + slice.value, 0);

export const getAverageUtilization = (zones: { utilization: number }[]): number => {
  if (!zones.length) return 0;
  return zones.reduce((sum, zone) => sum + zone.utilization, 0) / zones.length;
};

export const countStandardOrders = (orders: ActiveOrder[]): number =>
  orders.filter((order) => order.priority === "Standard").length;


export const countByStatus = (orders: ActiveOrder[], status: ActiveOrder["status"]): number =>
  orders.filter((order) => order.status === status).length;

export const getFulfillmentMix = (orders: ActiveOrder[]) => ({
  picking: countByStatus(orders, "Picking"),
  packing: countByStatus(orders, "Packing"),
  dispatch: countByStatus(orders, "Dispatch"),
});

export const getFilterMatchRate = (filtered: number, total: number): number =>
  total === 0 ? 0 : Number(((filtered / total) * 100).toFixed(1));
