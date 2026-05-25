import type { ActiveOrder } from "./types";

export const countBreachedOrders = (orders: ActiveOrder[]): number =>
  orders.filter((order) => order.breached).length;

export const countActiveByZone = (
  orders: ActiveOrder[],
  zone: ActiveOrder["zone"],
): number => orders.filter((order) => order.zone === zone).length;
