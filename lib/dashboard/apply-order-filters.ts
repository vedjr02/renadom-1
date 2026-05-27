import type { ActiveOrder } from "@/lib/simulation/types";
import type { CategoryFilter } from "@/hooks/useCategoryFilter";
import type { PriorityFilter } from "@/hooks/usePriorityFilter";
import type { ZoneFilter } from "@/hooks/useZoneFilter";
import {
  filterOrdersByCategory,
  filterOrdersByPriority,
  filterOrdersByQuery,
  filterOrdersByZone,
} from "@/lib/dashboard/filter-orders";

interface ApplyOrderFiltersInput {
  orders: ActiveOrder[];
  zone: ZoneFilter;
  priority: PriorityFilter;
  category: CategoryFilter;
  query: string;
}

export const applyOrderFilters = ({
  orders,
  zone,
  priority,
  category,
  query,
}: ApplyOrderFiltersInput): ActiveOrder[] =>
  filterOrdersByQuery(
    filterOrdersByCategory(
      filterOrdersByPriority(filterOrdersByZone(orders, zone), priority),
      category,
    ),
    query,
  );
