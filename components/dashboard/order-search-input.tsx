"use client";

interface OrderSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function OrderSearchInput({ value, onChange, onClear }: OrderSearchInputProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search order, picker, category..."
        className="w-52 bg-transparent text-xs text-white/80 outline-none placeholder:text-white/30"
      />
      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="text-[10px] uppercase tracking-[0.16em] text-white/40 hover:text-white/70"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
