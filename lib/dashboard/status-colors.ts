import type { OrderStatus } from "@/lib/simulation/types";

export const statusColors: Record<OrderStatus, string> = {
  Picking: "text-orange-300 border-orange-500/30 bg-orange-500/10",
  Packing: "text-amber-300 border-amber-500/30 bg-amber-500/10",
  Dispatch: "text-lime-300 border-lime-500/30 bg-lime-500/10",
};
