"use client";

import { CLEAR_SEARCH_LABEL, SEARCH_PLACEHOLDER } from "@/lib/dashboard/ui-copy";
import { opsInput } from "@/lib/dashboard/ui-theme";

interface OrderSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function OrderSearchInput({ value, onChange, onClear }: OrderSearchInputProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={SEARCH_PLACEHOLDER}
        className={`${opsInput} w-56 text-xs`}
      />
      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 hover:text-zinc-300"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
