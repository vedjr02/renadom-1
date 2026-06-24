"use client";

import { FOOTER_BUILD_LABEL } from "@/lib/dashboard/ui-copy";
import { useShiftClock } from "@/hooks/useShiftClock";
import { KeyboardHints } from "@/components/dashboard/keyboard-hints";
import { formatShiftElapsed } from "@/lib/formatters";
import { motion } from "framer-motion";
import { useLiveClock } from "@/hooks/useLiveClock";
import { formatHourLabel } from "@/hooks/useStoreSimulation";

interface DashboardFooterProps {
  lastUpdated: number;
}

export function DashboardFooter({ lastUpdated }: DashboardFooterProps) {
  const now = useLiveClock(1000);
  const elapsed = useShiftClock();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-800 pt-6 text-[11px] uppercase tracking-[0.2em] text-zinc-600 sm:flex-row"
    >
      <span>{FOOTER_BUILD_LABEL}</span>
      <KeyboardHints />
      <span>
        Last sync {formatHourLabel(lastUpdated || now)} · Mock stream active · Shift {formatShiftElapsed(elapsed)}
      </span>
    </motion.footer>
  );
}
