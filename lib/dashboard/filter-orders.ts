import type { ActiveOrder } from "@/lib/simulation/types";
import type { ZoneFilter } from "@/hooks/useZoneFilter";

export const filterOrdersByZone = (
  orders: ActiveOrder[],
  filter: ZoneFilter,
): ActiveOrder[] =>
  filter === "All" ? orders : orders.filter((order) => order.zone === filter);

export const filterOrdersByQuery = (orders: ActiveOrder[], query: string): ActiveOrder[] => {
  const q = query.trim().toLowerCase();
  if (!q) return orders;
  return orders.filter(
    (order) =>
      order.id.toLowerCase().includes(q) ||
      order.picker.toLowerCase().includes(q) ||
      order.category.toLowerCase().includes(q),
  );
};
