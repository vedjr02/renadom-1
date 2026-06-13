import type { OrderCategory } from "@/lib/simulation/types";

export const categoryColors: Record<OrderCategory, string> = {
  Groceries: "text-lime-400 border-lime-600/40 bg-lime-950/50",
  Electronics: "text-sky-400 border-sky-600/40 bg-sky-950/50",
  FMCG: "text-amber-400 border-amber-600/40 bg-amber-950/50",
};
