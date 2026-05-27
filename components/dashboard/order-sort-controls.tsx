"use client";

import type { OrderSortKey } from "@/hooks/useSortedOrders";

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
          className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition ${
            value === option.key
              ? "border-violet-400/30 bg-violet-400/10 text-violet-200"
              : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white/70"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
