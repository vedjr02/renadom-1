"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BreachAlertBanner } from "@/components/dashboard/breach-alert-banner";
import { ActiveOrdersTable } from "@/components/dashboard/active-orders-table";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { KpiScorecards } from "@/components/dashboard/kpi-scorecards";
import { OrdersSlaChart } from "@/components/dashboard/orders-sla-chart";
import { RevenueDonutChart } from "@/components/dashboard/revenue-donut-chart";
import { ZoneHeatmapStrip } from "@/components/dashboard/zone-heatmap-strip";
import { countBreachedOrders } from "@/lib/simulation/selectors";
import { ShiftSummaryBar } from "@/components/dashboard/shift-summary-bar";
import { SimulationControls } from "@/components/dashboard/simulation-controls";
import { DashboardToolbar } from "@/components/dashboard/dashboard-toolbar";
import { ZoneFilterTabs } from "@/components/dashboard/zone-filter-tabs";
import { OrderSortControls } from "@/components/dashboard/order-sort-controls";
import { PickerLeaderboard } from "@/components/dashboard/picker-leaderboard";
import { PerformanceScoreRing } from "@/components/dashboard/performance-score-ring";
import { ThroughputTicker } from "@/components/dashboard/throughput-ticker";
import { useShiftClock } from "@/hooks/useShiftClock";
import { useZoneFilter } from "@/hooks/useZoneFilter";
import { useSortedOrders, type OrderSortKey } from "@/hooks/useSortedOrders";
import { useState } from "react";
import { useLiveClock } from "@/hooks/useLiveClock";
import { filterOrdersByZone } from "@/lib/dashboard/filter-orders";
import { useStoreSimulation } from "@/hooks/useStoreSimulation";

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * index,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function DashboardShell() {
  const {
    isReady,
    kpis,
    hourlyTrend,
    revenueBreakdown,
    activeOrders,
    zoneLoads,
    lastUpdated,
  } = useStoreSimulation();

  if (!isReady || !kpis) {
    return <DashboardSkeleton />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="dashboard"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[1480px] flex-1 px-4 py-8 sm:px-10 sm:py-10 lg:px-14"
      >
        <motion.div custom={0} variants={sectionVariants} initial="hidden" animate="visible">
          <DashboardHeader lastUpdated={lastUpdated} activeOrders={activeOrders.length} />
        </motion.div>

        <BreachAlertBanner breachCount={countBreachedOrders(activeOrders)} />

        <div className="dashboard-grid mt-2">
          <motion.div custom={1} variants={sectionVariants} initial="hidden" animate="visible">
            <KpiScorecards kpis={kpis} />
          </motion.div>

          <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible">
            <ZoneHeatmapStrip zones={zoneLoads} />
          </motion.div>

          <motion.div
            custom={3}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 xl:grid-cols-[1.65fr_1fr]"
          >
            <OrdersSlaChart data={hourlyTrend} />
            <RevenueDonutChart data={revenueBreakdown} />
          </motion.div>

          <motion.div custom={4} variants={sectionVariants} initial="hidden" animate="visible">
            <ActiveOrdersTable orders={activeOrders} lastUpdated={lastUpdated} />
          </motion.div>

          <DashboardFooter lastUpdated={lastUpdated} />
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
