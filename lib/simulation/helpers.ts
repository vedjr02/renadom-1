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
