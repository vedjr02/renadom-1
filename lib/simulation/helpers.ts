import type { ActiveOrder, OrderPriority } from '@/lib/simulation/types';
export const isExpressOrder = (o: ActiveOrder): boolean => o.priority === 'Express';
export const isVipOrder = (o: ActiveOrder): boolean => o.priority === 'VIP';
export const isBreached = (o: ActiveOrder): boolean => o.breached;
export const isPicking = (o: ActiveOrder): boolean => o.status === 'Picking';
export const isPacking = (o: ActiveOrder): boolean => o.status === 'Packing';
export const isDispatch = (o: ActiveOrder): boolean => o.status === 'Dispatch';
export const priorityWeight = (p: OrderPriority): number =>
  p === 'VIP' ? 3 : p === 'Express' ? 2 : 1;
export const orderAgeMs = (o: ActiveOrder, now: number): number => Math.max(0, now - o.startedAt);
export const matchesPicker = (o: ActiveOrder, q: string): boolean =>
  o.picker.toLowerCase().includes(q.toLowerCase());
export const matchesOrderId = (o: ActiveOrder, q: string): boolean =>
  o.id.toLowerCase().includes(q.toLowerCase());
export const countByStatus = (orders: ActiveOrder[], status: ActiveOrder['status']): number =>
  orders.filter(o => o.status === status).length;
export const countByPriority = (orders: ActiveOrder[], p: OrderPriority): number =>
  orders.filter(o => o.priority === p).length;
export const hasActiveBreaches = (orders: ActiveOrder[]): boolean => orders.some(o => o.breached);
export const getUniquePickers = (orders: ActiveOrder[]): string[] =>
  [...new Set(orders.map(o => o.picker))];
export const sortByPriority = (a: ActiveOrder, b: ActiveOrder): number =>
  priorityWeight(b.priority) - priorityWeight(a.priority);
export const averageOrderAgeMin = (orders: ActiveOrder[], now: number): number => {
  if (!orders.length) return 0;
  return orders.reduce((s, o) => s + orderAgeMs(o, now), 0) / orders.length / 60000;
};
export const expressRatio = (orders: ActiveOrder[]): number => {
  if (!orders.length) return 0;
  return orders.filter(isExpressOrder).length / orders.length;
};
export const breachRatio = (orders: ActiveOrder[]): number => {
  if (!orders.length) return 0;
  return orders.filter(isBreached).length / orders.length;
};
export const vipRatio = (orders: ActiveOrder[]): number => {
  if (!orders.length) return 0;
  return orders.filter(isVipOrder).length / orders.length;
};
export const pickingRatio = (orders: ActiveOrder[]): number => {
  if (!orders.length) return 0;
  return countByStatus(orders, 'Picking') / orders.length;
};
export const dispatchRatio = (orders: ActiveOrder[]): number => {
  if (!orders.length) return 0;
  return countByStatus(orders, 'Dispatch') / orders.length;
};
export const countUniqueZones = (orders: ActiveOrder[]): number =>
  new Set(orders.map(o => o.zone)).size;
export const getOldestOrder = (orders: ActiveOrder[]): ActiveOrder | undefined =>
  orders.reduce<ActiveOrder | undefined>((old, o) => (!old || o.startedAt < old.startedAt ? o : old), undefined);
export const isNearBreach = (o: ActiveOrder, now: number): boolean =>
  !o.breached && orderAgeMs(o, now) > 8 * 60 * 1000;
export const filterByZone = (orders: ActiveOrder[], zone: string): ActiveOrder[] =>
  orders.filter(o => o.zone === zone);
export const filterBreached = (orders: ActiveOrder[]): ActiveOrder[] =>
  orders.filter(isBreached);
export const countNearBreach = (orders: ActiveOrder[], now: number): number =>
  orders.filter(o => isNearBreach(o, now)).length;
export const countVipOrders = (orders: ActiveOrder[]): number =>
  countByPriority(orders, 'VIP');
export const getNewestOrder = (orders: ActiveOrder[]): ActiveOrder | undefined =>
  orders.reduce<ActiveOrder | undefined>((n, o) => (!n || o.startedAt > n.startedAt ? o : n), undefined);
export const averagePickerLoad = (orders: ActiveOrder[]): number => {
  const pickers = getUniquePickers(orders);
  return pickers.length ? orders.length / pickers.length : 0;
};
export const maxOrderAgeMin = (orders: ActiveOrder[], now: number): number => {
  if (!orders.length) return 0;
  return Math.max(...orders.map(o => orderAgeMs(o, now))) / 60000;
};
export const standardRatio = (orders: ActiveOrder[]): number => {
  if (!orders.length) return 0;
  return countByPriority(orders, 'Standard') / orders.length;
};
export const packingRatio = (orders: ActiveOrder[]): number => {
  if (!orders.length) return 0;
  return countByStatus(orders, 'Packing') / orders.length;
};
export const sortByAge = (a: ActiveOrder, b: ActiveOrder): number => a.startedAt - b.startedAt;
