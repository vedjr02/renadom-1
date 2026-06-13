"use client";

import type { OrderSortKey } from "@/hooks/useSortedOrders";
import { opsBtn, opsBtnActive } from "@/lib/dashboard/ui-theme";

interface OrderSortControlsProps {
  value: OrderSortKey;
  onChange: (value: OrderSortKey) => void;
}

const options: { key: OrderSortKey; label: string }[] = [
  { key: "sla", label: "SLA Urgency" },
  { key: "age", label: "Newest" },
  { key: "priority", label: "Priority" },
];

export function OrderSortControls({ value, onChange }: OrderSortControlsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onChange(option.key)}
          className={value === option.key ? opsBtnActive : opsBtn}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
