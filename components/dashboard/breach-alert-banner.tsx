"use client";

import { motion } from "framer-motion";

interface BreachAlertBannerProps {
  breachCount: number;
}

export function BreachAlertBanner({ breachCount }: BreachAlertBannerProps) {
  if (breachCount === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-panel mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200/90"
    >
      {breachCount} active order{breachCount === 1 ? "" : "s"} currently breaching the 10-minute SLA.
    </motion.div>
  );
}
