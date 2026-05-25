import type { ActiveOrder } from "./types";

export const countBreachedOrders = (orders: ActiveOrder[]): number =>
  orders.filter((order) => order.breached).length;
