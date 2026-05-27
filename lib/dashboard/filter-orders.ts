import type { ActiveOrder } from "@/lib/simulation/types";
import type { ZoneFilter } from "@/hooks/useZoneFilter";

export const filterOrdersByZone = (
  orders: ActiveOrder[],
  filter: ZoneFilter,
): ActiveOrder[] =>
  filter === "All" ? orders : orders.filter((order) => order.zone === filter);
