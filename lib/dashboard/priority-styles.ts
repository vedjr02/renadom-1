export type OrderPriority = "Standard" | "Express" | "VIP";

export const ORDER_PRIORITIES: OrderPriority[] = ["Standard", "Express", "VIP"];

export const priorityStyles: Record<OrderPriority, string> = {
  Standard: "text-white/55 border-white/10 bg-white/[0.04]",
  Express: "text-amber-200 border-amber-400/25 bg-amber-400/10",
  VIP: "text-fuchsia-200 border-fuchsia-400/25 bg-fuchsia-400/10",
};
