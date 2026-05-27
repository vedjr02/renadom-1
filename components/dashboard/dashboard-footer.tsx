"use client";

import { useShiftClock } from "@/hooks/useShiftClock";
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
      className="tracking-caps mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-[11px] uppercase tracking-[0.24em] text-white/30 sm:flex-row"
    >
      <span>Q-Commerce Analytics Engine · Portfolio Build</span>
      <span>Last sync {formatHourLabel(lastUpdated || now)} · Mock stream active · Shift {formatShiftElapsed(elapsed)}</span>
    </motion.footer>
  );
}
