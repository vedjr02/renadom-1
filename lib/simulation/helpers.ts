import type { ActiveOrder, OrderPriority } from '@/lib/simulation/types';
export const isExpressOrder = (o: ActiveOrder): boolean => o.priority === 'Express';
