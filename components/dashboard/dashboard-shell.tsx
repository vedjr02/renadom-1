"use client";

import { ActiveOrdersTable } from "@/components/dashboard/active-orders-table";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { KpiScorecards } from "@/components/dashboard/kpi-scorecards";
import { OrdersSlaChart } from "@/components/dashboard/orders-sla-chart";
import { RevenueDonutChart } from "@/components/dashboard/revenue-donut-chart";
import { useStoreSimulation } from "@/hooks/useStoreSimulation";

export function DashboardShell() {
  const { kpis, hourlyTrend, revenueBreakdown, activeOrders, lastUpdated } =
    useStoreSimulation();

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 py-10 sm:px-10 lg:px-14">
      <DashboardHeader />
      <div className="dashboard-grid">
        <KpiScorecards kpis={kpis} />
        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <OrdersSlaChart data={hourlyTrend} />
          <RevenueDonutChart data={revenueBreakdown} />
        </div>
        <ActiveOrdersTable orders={activeOrders} lastUpdated={lastUpdated} />
      </div>
    </main>
  );
}
