"use client";

import { ARIA_EXPORT_CSV } from "@/lib/dashboard/aria-labels";
import { opsBtn } from "@/lib/dashboard/ui-theme";

interface ExportCsvButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

export function ExportCsvButton({ disabled = false, onClick }: ExportCsvButtonProps) {
  return (
    <button
      aria-label={ARIA_EXPORT_CSV}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${opsBtn} disabled:cursor-not-allowed disabled:opacity-40`}
    >
      Export CSV
    </button>
  );
}
