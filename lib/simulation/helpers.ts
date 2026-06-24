import type { ActiveOrder, OrderPriority } from '@/lib/simulation/types';
export const isExpressOrder = (o: ActiveOrder): boolean => o.priority === 'Express';
export const isVipOrder = (o: ActiveOrder): boolean => o.priority === 'VIP';
export const isBreached = (o: ActiveOrder): boolean => o.breached;
