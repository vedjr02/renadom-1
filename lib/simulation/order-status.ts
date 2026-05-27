import type { OrderStatus } from "@/lib/simulation/types";

const STATUS_FLOW: OrderStatus[] = ["Picking", "Packing", "Dispatch"];

export const advanceOrderStatus = (status: OrderStatus): OrderStatus => {
  const index = STATUS_FLOW.indexOf(status);
  if (index === -1 || index === STATUS_FLOW.length - 1) return status;
  return STATUS_FLOW[index + 1];
};

export const maybeAdvanceStatus = (
  status: OrderStatus,
  chance = 0.18,
): OrderStatus => (Math.random() < chance ? advanceOrderStatus(status) : status);
