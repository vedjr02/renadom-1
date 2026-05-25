import type { OrderCategory } from "@/lib/simulation/types";

export const categoryColors: Record<OrderCategory, string> = {
  Groceries: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
  Electronics: "text-violet-300 border-violet-400/20 bg-violet-400/10",
  FMCG: "text-amber-300 border-amber-400/20 bg-amber-400/10",
};
