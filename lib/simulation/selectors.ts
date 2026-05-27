import type { ActiveOrder } from "./types";

export const countBreachedOrders = (orders: ActiveOrder[]): number =>
  orders.filter((order) => order.breached).length;

export const countActiveByZone = (
  orders: ActiveOrder[],
  zone: ActiveOrder["zone"],
): number => orders.filter((order) => order.zone === zone).length;

export const countExpressOrders = (orders: ActiveOrder[]): number =>
  orders.filter((order) => order.priority !== "Standard").length;

export const countVipOrders = (orders: ActiveOrder[]): number =>
  orders.filter((order) => order.priority === "VIP").length;
