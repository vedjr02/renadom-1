export type OrderPriority = "Standard" | "Express" | "VIP";

export const ORDER_PRIORITIES: OrderPriority[] = ["Standard", "Express", "VIP"];

export const priorityStyles: Record<OrderPriority, string> = {
  Standard: "text-zinc-400 border-zinc-700 bg-zinc-900",
  Express: "text-orange-300 border-orange-500/30 bg-orange-500/10",
  VIP: "text-lime-300 border-lime-500/30 bg-lime-500/10",
};
