"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ActiveOrdersTable } from "@/components/dashboard/active-orders-table";
import { BreachAlertBanner } from "@/components/dashboard/breach-alert-banner";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { DashboardToolbar } from "@/components/dashboard/dashboard-toolbar";
import { KpiScorecards } from "@/components/dashboard/kpi-scorecards";
import { OrderSortControls } from "@/components/dashboard/order-sort-controls";
import { OrdersSlaChart } from "@/components/dashboard/orders-sla-chart";
import { PerformanceScoreRing } from "@/components/dashboard/performance-score-ring";
import { PickerLeaderboard } from "@/components/dashboard/picker-leaderboard";
import { RevenueDonutChart } from "@/components/dashboard/revenue-donut-chart";
import { ShiftSummaryBar } from "@/components/dashboard/shift-summary-bar";
import { SimulationControls } from "@/components/dashboard/simulation-controls";
import { ThroughputTicker } from "@/components/dashboard/throughput-ticker";
import { ZoneFilterTabs } from "@/components/dashboard/zone-filter-tabs";
import { ZoneHeatmapStrip } from "@/components/dashboard/zone-heatmap-strip";
import { applyOrderFilters } from "@/lib/dashboard/apply-order-filters";
import { filterOrdersByZone } from "@/lib/dashboard/filter-orders";
import { countBreachedOrders, getFilterMatchRate, getFulfillmentMix, getTotalRevenue } from "@/lib/simulation/selectors";
import { useLiveClock } from "@/hooks/useLiveClock";
import { useShiftClock } from "@/hooks/useShiftClock";
import { useSortedOrders, type OrderSortKey } from "@/hooks/useSortedOrders";
import { useStoreSimulation } from "@/hooks/useStoreSimulation";
import { useCompactMode } from "@/hooks/useCompactMode";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import { usePriorityFilter } from "@/hooks/usePriorityFilter";
import { useOrderSearch } from "@/hooks/useOrderSearch";
import { useZoneFilter } from "@/hooks/useZoneFilter";

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
    paused,
    toggleSimulation,
  } = useStoreSimulation();

  const { filter, setFilter } = useZoneFilter();
  const { priority, setPriority } = usePriorityFilter();
  const { category, setCategory } = useCategoryFilter();
  const { query, setQuery, clear, hasQuery } = useOrderSearch();
  const { compact, toggle: toggleCompact } = useCompactMode();
  const [sortKey, setSortKey] = useState<OrderSortKey>("sla");
  const elapsedMinutes = useShiftClock();
  const now = useLiveClock(1000);

  const filteredOrders = applyOrderFilters({ orders: activeOrders, zone: filter, priority, category, query });
  const sortedOrders = useSortedOrders(filteredOrders, sortKey, now);
  const fulfillmentMix = getFulfillmentMix(activeOrders);
  const latestHour = hourlyTrend[hourlyTrend.length - 1];

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
          <DashboardHeader lastUpdated={lastUpdated} activeOrders={activeOrders.length} paused={paused} />
        </motion.div>

        <motion.div custom={1} variants={sectionVariants} initial="hidden" animate="visible" className="mt-6">
          <ShiftSummaryBar
            elapsedMinutes={elapsedMinutes}
            zones={zoneLoads}
            breachCount={countBreachedOrders(activeOrders)}
            revenueTotal={getTotalRevenue(revenueBreakdown)}
          />
        </motion.div>

        <BreachAlertBanner breachCount={countBreachedOrders(activeOrders)} />

        <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible" className="mt-4">
          <DashboardToolbar>
            <div className="flex flex-wrap items-center gap-3">
              <SimulationControls paused={paused} onToggle={toggleSimulation} />
              <CompactModeToggle compact={compact} onToggle={toggleCompact} />
              <ExportCsvButton disabled={sortedOrders.length === 0} />
              {latestHour ? (
                <ThroughputTicker
                  ordersProcessed={latestHour.ordersProcessed}
                  breaches={latestHour.slaBreaches}
                />
              ) : null}
            </div>
            <div className="flex flex-col gap-3">
              <ZoneFilterTabs value={filter} onChange={setFilter} />
              <PriorityFilterTabs value={priority} onChange={setPriority} />
              <CategoryFilterChips value={category} onChange={setCategory} />
            </div>
          </DashboardToolbar>
        </motion.div>

        <div className="dashboard-grid mt-2">
          <motion.div custom={3} variants={sectionVariants} initial="hidden" animate="visible">
            <KpiScorecards kpis={kpis} />
          </motion.div>

          <motion.div custom={4} variants={sectionVariants} initial="hidden" animate="visible">
            <ZoneHeatmapStrip zones={zoneLoads} />
          </motion.div>

          <motion.div
            custom={5}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr_0.8fr]"
          >
            <OrdersSlaChart data={hourlyTrend} />
            <RevenueDonutChart data={revenueBreakdown} />
            <div className="grid gap-6">
              <SlaHealthGauge complianceRate={kpis.slaComplianceRate} />
              <PerformanceScoreRing score={kpis.slaComplianceRate} label="Ops Score" />
              <FulfillmentInsights picking={fulfillmentMix.picking} packing={fulfillmentMix.packing} dispatch={fulfillmentMix.dispatch} />
              <PickerLeaderboard orders={activeOrders} />
            </div>
          </motion.div>

          <motion.div custom={6} variants={sectionVariants} initial="hidden" animate="visible">
            <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <OrderSearchInput value={query} onChange={setQuery} onClear={clear} />
              <OrderSortControls value={sortKey} onChange={setSortKey} />
            </div>
            {hasQuery || priority !== "All" || category !== "All" || filter !== "All" ? (
              <p className="mb-3 text-xs text-white/40">
                Showing {sortedOrders.length} of {activeOrders.length} ({getFilterMatchRate(sortedOrders.length, activeOrders.length)}%) result{sortedOrders.length === 1 ? "" : "s"} for current filters
              </p>
            ) : null}
            <ActiveOrdersTable orders={sortedOrders} lastUpdated={lastUpdated} now={now} compact={compact} />
          </motion.div>

          <DashboardFooter lastUpdated={lastUpdated} />
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
