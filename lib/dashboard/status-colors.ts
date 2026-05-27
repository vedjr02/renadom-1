import type { OrderStatus } from "@/lib/simulation/types";

export const statusColors: Record<OrderStatus, string> = {
  Picking: "text-cyan-200 border-cyan-400/25 bg-cyan-400/10",
  Packing: "text-violet-200 border-violet-400/25 bg-violet-400/10",
  Dispatch: "text-emerald-200 border-emerald-400/25 bg-emerald-400/10",
};
