"use client";

import { ARIA_BREACH_BANNER } from "@/lib/dashboard/aria-labels";
import { BREACH_WARNING_PREFIX } from "@/lib/dashboard/ui-copy";
import { motion } from "framer-motion";

interface BreachAlertBannerProps {
  breachCount: number;
}

export function BreachAlertBanner({ breachCount }: BreachAlertBannerProps) {
  if (breachCount === 0) return null;

  return (
    <motion.div role="alert" aria-label={ARIA_BREACH_BANNER}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-5 rounded-md border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-300"
    >
      {BREACH_WARNING_PREFIX}: {breachCount} active order{breachCount === 1 ? "" : "s"} currently breaching the 10-minute SLA.
    </motion.div>
  );
}
