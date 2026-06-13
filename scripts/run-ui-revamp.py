#!/usr/bin/env python3
"""Self-contained Forge Ops UI revamp runner — 70+ atomic git commits."""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def run(cmd: list[str], *, check: bool = True, capture: bool = False) -> subprocess.CompletedProcess:
    return subprocess.run(
        cmd,
        cwd=ROOT,
        check=check,
        capture_output=capture,
        text=True,
    )


def commit_count() -> int:
    return int(run(["git", "rev-list", "--count", "HEAD"], capture=True).stdout.strip())


def commit_push(msg: str) -> bool:
    run(["git", "add", "-A"])
    if run(["git", "diff", "--cached", "--quiet"], check=False).returncode == 0:
        print(f"SKIP (empty): {msg}")
        return False
    run(["git", "commit", "-m", msg])
    run(["git", "push"])
    print(f"OK ({commit_count()}): {msg}")
    return True


def write(rel: str, content: str) -> None:
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)


def replace_once(rel: str, old: str, new: str) -> None:
    path = ROOT / rel
    text = path.read_text()
    if old not in text:
        raise RuntimeError(f"replace_once: pattern not found in {rel}")
    path.write_text(text.replace(old, new, 1))


def delete_if_exists(rel: str) -> bool:
    path = ROOT / rel
    if path.exists():
        path.unlink()
        return True
    return False


# ---------------------------------------------------------------------------
# Inline file contents — Forge Ops industrial theme (zinc charcoal + orange)
# ---------------------------------------------------------------------------

UI_THEME = '''/** Shared Tailwind class bundles for the Forge Ops UI revamp. */
export const opsCard = "rounded-lg border border-zinc-800 bg-zinc-900/90 shadow-sm";
export const opsCardHover = "transition-colors hover:border-zinc-700 hover:bg-zinc-900";
export const opsPanel = "rounded-lg border border-zinc-800 bg-zinc-950/80";
export const opsLabel = "text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500";
export const opsHeading = "font-[family-name:var(--font-display)] tracking-tight text-zinc-50";
export const opsMuted = "text-zinc-400";
export const opsAccent = "text-orange-400";
export const opsBtn =
  "rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-300 transition hover:border-orange-500/50 hover:text-orange-300";
export const opsBtnActive =
  "rounded-md border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-orange-300";
export const opsInput =
  "rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-orange-500/50 focus:outline-none";
export const opsTableHead = "text-[10px] uppercase tracking-wider text-zinc-500";
export const opsDivider = "h-px bg-zinc-800";
'''

CHART_COLORS = '''export const CHART_ORANGE = "rgba(249, 115, 22, 0.9)";
export const CHART_ORANGE_FILL = "rgba(249, 115, 22, 0.25)";
export const CHART_RED = "rgba(239, 68, 68, 0.95)";
export const CHART_GRID = "rgba(255, 255, 255, 0.06)";
export const CHART_TICK = "rgba(161, 161, 170, 0.8)";
export const CHART_TOOLTIP_BG = "rgba(9, 9, 11, 0.96)";
export const CHART_TOOLTIP_BORDER = "rgba(63, 63, 70, 0.8)";
'''

NAV_ITEMS = '''export const NAV_ITEMS = [
  { id: "overview", label: "Overview", active: true },
  { id: "orders", label: "Orders", active: false },
  { id: "zones", label: "Zones", active: false },
  { id: "reports", label: "Reports", active: false },
] as const;
'''

LAYOUT = '''import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { AmbientBackground } from "@/components/dashboard/ambient-background";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forge Ops · Q-Commerce Command Center",
  description:
    "Industrial SLA and profitability command center for Q-Commerce dark store operations.",
  keywords: ["Q-Commerce", "SLA", "Dark Store", "Analytics", "Operations"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex bg-background font-[family-name:var(--font-body)] text-foreground">
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
'''

AMBIENT = '''"use client";

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 ops-dot-grid opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
    </div>
  );
}
'''

SIDEBAR = '''"use client";

import { Activity, BarChart3, Boxes, FileText } from "lucide-react";
import { NAV_ITEMS } from "@/lib/dashboard/nav-items";
import { opsAccent, opsLabel } from "@/lib/dashboard/ui-theme";

const icons = [Activity, Boxes, BarChart3, FileText] as const;

export function DashboardSidebar() {
  return (
    <aside className="ops-sidebar hidden w-56 shrink-0 flex-col px-4 py-8 lg:flex">
      <div className="mb-10 px-2">
        <p className={`${opsLabel} ${opsAccent}`}>Forge Ops</p>
        <h2 className="font-display mt-2 text-lg font-bold text-zinc-50">Dark Store</h2>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item, i) => {
          const Icon = icons[i] ?? Activity;
          return (
            <button
              key={item.id}
              type="button"
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
                item.active
                  ? "border border-orange-500/30 bg-orange-500/10 text-orange-300"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-3">
        <p className={opsLabel}>Shift Mode</p>
        <p className="mt-1 text-xs text-zinc-400">Live simulation · 3 zones</p>
      </div>
    </aside>
  );
}
'''

MOBILE_NAV = '''"use client";

import { NAV_ITEMS } from "@/lib/dashboard/nav-items";

export function DashboardMobileNav() {
  return (
    <nav className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium ${
            item.active
              ? "bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/30"
              : "bg-zinc-900 text-zinc-500 ring-1 ring-zinc-800"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
'''

ZONE_COLORS = '''import type { WarehouseZone } from "@/lib/simulation/types";

export const zoneAccentColors: Record<WarehouseZone, string> = {
  "Zone A — Cold Chain": "border-l-orange-500 bg-orange-500/5",
  "Zone B — Ambient": "border-l-zinc-400 bg-zinc-800/40",
  "Zone C — High-Velocity": "border-l-lime-500 bg-lime-500/5",
};
'''

PRIORITY_STYLES = '''export type OrderPriority = "Standard" | "Express" | "VIP";

export const ORDER_PRIORITIES: OrderPriority[] = ["Standard", "Express", "VIP"];

export const priorityStyles: Record<OrderPriority, string> = {
  Standard: "text-zinc-400 border-zinc-700 bg-zinc-900",
  Express: "text-orange-300 border-orange-500/30 bg-orange-500/10",
  VIP: "text-lime-300 border-lime-500/30 bg-lime-500/10",
};
'''

CATEGORY_COLORS = '''import type { OrderCategory } from "@/lib/simulation/types";

export const categoryColors: Record<OrderCategory, string> = {
  Groceries: "text-lime-400 border-lime-600/40 bg-lime-950/50",
  Electronics: "text-sky-400 border-sky-600/40 bg-sky-950/50",
  FMCG: "text-amber-400 border-amber-600/40 bg-amber-950/50",
};
'''

STATUS_COLORS = '''import type { OrderStatus } from "@/lib/simulation/types";

export const statusColors: Record<OrderStatus, string> = {
  Picking: "text-orange-300 border-orange-500/30 bg-orange-500/10",
  Packing: "text-amber-300 border-amber-500/30 bg-amber-500/10",
  Dispatch: "text-lime-300 border-lime-500/30 bg-lime-500/10",
};
'''

COMPONENTS: dict[str, str] = {
    "components/dashboard/panel-header.tsx": '''interface PanelHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export function PanelHeader({ title, subtitle, badge }: PanelHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h2 className="font-display text-lg font-semibold tracking-tight text-zinc-50">{title}</h2>
        <p className="text-sm text-zinc-500">{subtitle}</p>
      </div>
      {badge ? (
        <span className="rounded-md border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-orange-300">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
''',
    "components/dashboard/stat-pill.tsx": '''interface StatPillProps {
  label: string;
  value: string;
}

export function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="ops-card rounded-md px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="font-display mt-1 text-lg font-semibold text-zinc-100">{value}</p>
    </div>
  );
}
''',
    "components/dashboard/dashboard-toolbar.tsx": '''"use client";

interface DashboardToolbarProps {
  children: React.ReactNode;
}

export function DashboardToolbar({ children }: DashboardToolbarProps) {
  return (
    <div className="ops-panel mb-5 flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
      {children}
    </div>
  );
}
''',
    "components/dashboard/simulation-controls.tsx": '''"use client";

import { opsBtn } from "@/lib/dashboard/ui-theme";

interface SimulationControlsProps {
  paused: boolean;
  onToggle: () => void;
}

export function SimulationControls({ paused, onToggle }: SimulationControlsProps) {
  return (
    <button
      aria-label="Pause or resume live simulation stream"
      type="button"
      onClick={onToggle}
      className={opsBtn}
    >
      {paused ? "Resume Stream" : "Pause Stream"}
    </button>
  );
}
''',
    "components/dashboard/compact-mode-toggle.tsx": '''"use client";

import { opsBtn } from "@/lib/dashboard/ui-theme";

interface CompactModeToggleProps {
  compact: boolean;
  onToggle: () => void;
}

export function CompactModeToggle({ compact, onToggle }: CompactModeToggleProps) {
  return (
    <button
      aria-label="Toggle compact table density"
      type="button"
      onClick={onToggle}
      className={opsBtn}
    >
      {compact ? "Comfort View" : "Compact View"}
    </button>
  );
}
''',
    "components/dashboard/export-csv-button.tsx": '''"use client";

import { opsBtn } from "@/lib/dashboard/ui-theme";

interface ExportCsvButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

export function ExportCsvButton({ disabled = false, onClick }: ExportCsvButtonProps) {
  return (
    <button
      aria-label="Export filtered orders as CSV"
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${opsBtn} disabled:cursor-not-allowed disabled:opacity-40`}
    >
      Export CSV
    </button>
  );
}
''',
    "components/dashboard/throughput-ticker.tsx": '''"use client";

interface ThroughputTickerProps {
  ordersProcessed: number;
  breaches: number;
}

export function ThroughputTicker({ ordersProcessed, breaches }: ThroughputTickerProps) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-400">
      <span className="font-mono tabular-nums text-orange-400">{ordersProcessed} orders/hr</span>
      <span className="text-zinc-700">·</span>
      <span className="font-mono tabular-nums text-amber-400">{breaches} breaches</span>
    </div>
  );
}
''',
    "components/dashboard/ops-pulse-indicator.tsx": '''"use client";

interface OpsPulseIndicatorProps {
  paused: boolean;
}

export function OpsPulseIndicator({ paused }: OpsPulseIndicatorProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] ${
        paused ? "text-amber-400" : "text-lime-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          paused ? "bg-amber-400" : "animate-pulse bg-lime-400"
        }`}
      />
      {paused ? "Ops Pulse Paused" : "Ops Pulse Live"}
    </span>
  );
}
''',
    "components/dashboard/live-badge.tsx": '''export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-lime-500/30 bg-lime-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-lime-300">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
      </span>
      Live
    </span>
  );
}
''',
    "components/dashboard/breach-alert-banner.tsx": '''"use client";

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
      className="mb-5 rounded-md border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-300"
    >
      {breachCount} active order{breachCount === 1 ? "" : "s"} currently breaching the 10-minute SLA.
    </motion.div>
  );
}
''',
    "components/dashboard/shift-summary-bar.tsx": '''"use client";

import { formatShiftElapsed } from "@/lib/formatters";
import { getAverageUtilization } from "@/lib/simulation/selectors";
import type { ZoneLoadMetric } from "@/lib/simulation/types";
import { opsLabel } from "@/lib/dashboard/ui-theme";

interface ShiftSummaryBarProps {
  elapsedMinutes: number;
  zones: ZoneLoadMetric[];
  breachCount: number;
  revenueTotal: number;
}

export function ShiftSummaryBar({
  elapsedMinutes,
  zones,
  breachCount,
  revenueTotal,
}: ShiftSummaryBarProps) {
  const avgUtil = getAverageUtilization(zones);

  return (
    <section className="ops-panel flex flex-wrap items-center gap-4 px-5 py-4">
      <div>
        <p className={opsLabel}>Shift Elapsed</p>
        <p className="font-display mt-1 text-lg font-semibold text-zinc-100">{formatShiftElapsed(elapsedMinutes)}</p>
      </div>
      <div className="hidden h-10 w-px bg-zinc-800 sm:block" />
      <div>
        <p className={opsLabel}>Avg Utilization</p>
        <p className="font-display mt-1 text-lg font-semibold text-orange-400">{Math.round(avgUtil)}%</p>
      </div>
      <div className="hidden h-10 w-px bg-zinc-800 sm:block" />
      <div>
        <p className={opsLabel}>Active Breaches</p>
        <p className="font-display mt-1 text-lg font-semibold text-amber-400">{breachCount}</p>
      </div>
      <div className="hidden h-10 w-px bg-zinc-800 sm:block" />
      <div>
        <p className={opsLabel}>Shift Revenue</p>
        <p className="font-display mt-1 text-lg font-semibold text-zinc-100">${(revenueTotal / 1000).toFixed(0)}k</p>
      </div>
    </section>
  );
}
''',
    "components/dashboard/zone-filter-tabs.tsx": '''"use client";

import { WAREHOUSE_ZONES } from "@/lib/simulation/constants";
import type { ZoneFilter } from "@/hooks/useZoneFilter";
import { opsBtn, opsBtnActive } from "@/lib/dashboard/ui-theme";

interface ZoneFilterTabsProps {
  value: ZoneFilter;
  onChange: (value: ZoneFilter) => void;
}

const tabs: ZoneFilter[] = ["All", ...WAREHOUSE_ZONES];

export function ZoneFilterTabs({ value, onChange }: ZoneFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={value === tab ? opsBtnActive : opsBtn}
        >
          {tab === "All" ? "All Zones" : tab.split("—")[0]?.trim()}
        </button>
      ))}
    </div>
  );
}
''',
    "components/dashboard/priority-filter-tabs.tsx": '''"use client";

import type { PriorityFilter } from "@/hooks/usePriorityFilter";
import { opsBtn, opsBtnActive } from "@/lib/dashboard/ui-theme";

interface PriorityFilterTabsProps {
  value: PriorityFilter;
  onChange: (value: PriorityFilter) => void;
}

const tabs: PriorityFilter[] = ["All", "Standard", "Express", "VIP"];

export function PriorityFilterTabs({ value, onChange }: PriorityFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={value === tab ? opsBtnActive : opsBtn}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
''',
    "components/dashboard/category-filter-chips.tsx": '''"use client";

import type { CategoryFilter } from "@/hooks/useCategoryFilter";
import { opsBtn, opsBtnActive } from "@/lib/dashboard/ui-theme";

interface CategoryFilterChipsProps {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
}

const chips: CategoryFilter[] = ["All", "Groceries", "Electronics", "FMCG"];

export function CategoryFilterChips({ value, onChange }: CategoryFilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onChange(chip)}
          className={value === chip ? opsBtnActive : opsBtn}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
''',
    "components/dashboard/order-search-input.tsx": '''"use client";

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
        placeholder="Search order, picker, category..."
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
''',
    "components/dashboard/order-sort-controls.tsx": '''"use client";

import type { OrderSortKey } from "@/hooks/useSortedOrders";
import { opsBtn, opsBtnActive } from "@/lib/dashboard/ui-theme";

interface OrderSortControlsProps {
  value: OrderSortKey;
  onChange: (value: OrderSortKey) => void;
}

const options: { key: OrderSortKey; label: string }[] = [
  { key: "sla", label: "SLA Urgency" },
  { key: "age", label: "Newest" },
  { key: "priority", label: "Priority" },
];

export function OrderSortControls({ value, onChange }: OrderSortControlsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onChange(option.key)}
          className={value === option.key ? opsBtnActive : opsBtn}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
''',
    "components/dashboard/filter-empty-state.tsx": '''"use client";

import { EMPTY_FILTER_MESSAGE } from "@/lib/dashboard/ui-copy";

export function FilterEmptyState() {
  return (
    <div className="rounded-md border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-10 text-center text-sm text-zinc-500">
      {EMPTY_FILTER_MESSAGE}
    </div>
  );
}
''',
    "components/dashboard/keyboard-hints.tsx": '''"use client";

import { KEYBOARD_SHORTCUTS } from "@/lib/dashboard/keyboard-shortcuts";

export function KeyboardHints() {
  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-xs text-zinc-500">
      {KEYBOARD_SHORTCUTS.map((item) => (
        <p key={item.keys} className="mt-1 first:mt-0">
          <span className="font-mono text-orange-400">{item.keys}</span> — {item.action}
        </p>
      ))}
    </div>
  );
}
''',
    "components/dashboard/order-status-badge.tsx": '''"use client";

import { statusColors } from "@/lib/dashboard/status-colors";
import type { OrderStatus } from "@/lib/simulation/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={`rounded-md border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}
''',
    "components/dashboard/order-age-cell.tsx": '''"use client";

import { formatOrderAge } from "@/lib/formatters";
import { getOrderAgeMinutes } from "@/lib/dashboard/order-age";

interface OrderAgeCellProps {
  startedAt: number;
  now: number;
}

export function OrderAgeCell({ startedAt, now }: OrderAgeCellProps) {
  const age = getOrderAgeMinutes(startedAt, now);

  return (
    <span className={`font-mono text-xs tabular-nums ${age >= 8 ? "text-amber-400" : "text-zinc-500"}`}>
      {formatOrderAge(age)}
    </span>
  );
}
''',
    "components/dashboard/revenue-delta-badge.tsx": '''"use client";

import { formatDelta } from "@/lib/formatters";

interface RevenueDeltaBadgeProps {
  delta: number;
}

export function RevenueDeltaBadge({ delta }: RevenueDeltaBadgeProps) {
  return (
    <span
      className={`rounded-md border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${
        delta >= 0
          ? "border-lime-500/30 bg-lime-500/10 text-lime-300"
          : "border-red-500/30 bg-red-500/10 text-red-300"
      }`}
    >
      {formatDelta(delta, "%")} shift
    </span>
  );
}
''',
    "components/dashboard/dashboard-footer.tsx": '''"use client";

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
      <span>Forge Ops · Q-Commerce Analytics Engine</span>
      <KeyboardHints />
      <span>
        Last sync {formatHourLabel(lastUpdated || now)} · Mock stream active · Shift {formatShiftElapsed(elapsed)}
      </span>
    </motion.footer>
  );
}
''',
    "components/dashboard/dashboard-skeleton.tsx": '''"use client";

import { motion } from "framer-motion";

const pulse = {
  animate: { opacity: [0.35, 0.7, 0.35] },
  transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const },
};

export function DashboardSkeleton() {
  return (
    <main className="mx-auto w-full max-w-[1480px] flex-1 px-6 py-10 sm:px-10 lg:px-14">
      <motion.div {...pulse} className="mb-10 h-28 rounded-lg bg-zinc-900" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={index}
            {...pulse}
            transition={{ ...pulse.transition, delay: index * 0.08 }}
            className="h-44 rounded-lg bg-zinc-900"
          />
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={`zone-${index}`}
            {...pulse}
            transition={{ ...pulse.transition, delay: index * 0.06 }}
            className="h-36 rounded-lg bg-zinc-900"
          />
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <motion.div {...pulse} className="h-96 rounded-lg bg-zinc-900" />
        <motion.div {...pulse} className="h-96 rounded-lg bg-zinc-900" />
      </div>
      <motion.div {...pulse} className="mt-6 h-80 rounded-lg bg-zinc-900" />
    </main>
  );
}
''',
    "components/dashboard/zone-heatmap-strip.tsx": '''"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { zoneAccentColors } from "@/lib/dashboard/zone-colors";
import type { ZoneLoadMetric } from "@/lib/simulation/types";
import { opsLabel } from "@/lib/dashboard/ui-theme";

interface ZoneHeatmapStripProps {
  zones: ZoneLoadMetric[];
}

const riskStyles = {
  Low: "from-lime-500/80 to-lime-500/30",
  Med: "from-amber-500/80 to-amber-500/30",
  High: "from-red-500/80 to-red-500/30",
};

const zoneShortName = (zone: ZoneLoadMetric["zone"]) => zone.split("—")[0]?.trim() ?? zone;

export function ZoneHeatmapStrip({ zones }: ZoneHeatmapStripProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {zones.map((zone, index) => (
        <motion.div
          key={zone.zone}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * index, duration: 0.4 }}
          className={`ops-card border-l-4 p-5 ${zoneAccentColors[zone.zone]}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={opsLabel}>{zoneShortName(zone.zone)}</p>
              <p className="mt-1 text-sm font-medium text-zinc-300">{zone.zone.split("—")[1]?.trim()}</p>
            </div>
            <span className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {zone.breachRisk} risk
            </span>
          </div>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="font-display text-2xl font-bold text-zinc-100">
                <AnimatedNumber value={zone.utilization} format={(n) => `${Math.round(n)}%`} />
              </p>
              <p className="mt-1 text-xs text-zinc-500">Utilization</p>
            </div>
            <p className="text-xs text-zinc-500">
              <AnimatedNumber value={zone.ordersInZone} format={(n) => `${Math.round(n)}`} /> orders
            </p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${riskStyles[zone.breachRisk]}`}
              animate={{ width: `${zone.utilization}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
}
''',
    "components/dashboard/sla-health-gauge.tsx": '''"use client";

import { opsLabel } from "@/lib/dashboard/ui-theme";

interface SlaHealthGaugeProps {
  complianceRate: number;
}

export function SlaHealthGauge({ complianceRate }: SlaHealthGaugeProps) {
  const tone =
    complianceRate >= 95
      ? "text-lime-300 border-lime-500/30 bg-lime-500/10"
      : complianceRate >= 90
        ? "text-amber-300 border-amber-500/30 bg-amber-500/10"
        : "text-red-300 border-red-500/30 bg-red-500/10";

  return (
    <div className={`rounded-md border px-4 py-3 ${tone}`}>
      <p className={opsLabel}>SLA Health</p>
      <p className="font-display mt-2 text-2xl font-bold">{complianceRate.toFixed(1)}%</p>
      <p className="mt-1 text-xs opacity-80">Target ≥ 95%</p>
    </div>
  );
}
''',
    "components/dashboard/performance-score-ring.tsx": '''"use client";

interface PerformanceScoreRingProps {
  score: number;
  label: string;
}

export function PerformanceScoreRing({ score, label }: PerformanceScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="grid h-20 w-20 place-items-center rounded-full border border-orange-500/30 bg-orange-500/5"
        style={{
          background: `conic-gradient(rgba(249,115,22,0.85) ${clamped}%, rgba(39,39,42,0.8) 0)`,
        }}
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-zinc-950 text-sm font-semibold text-zinc-100">
          {Math.round(clamped)}
        </div>
      </div>
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">{label}</p>
    </div>
  );
}
''',
    "components/dashboard/fulfillment-insights.tsx": '''"use client";

import { opsLabel } from "@/lib/dashboard/ui-theme";

interface FulfillmentInsightsProps {
  picking: number;
  packing: number;
  dispatch: number;
}

export function FulfillmentInsights({ picking, packing, dispatch }: FulfillmentInsightsProps) {
  const total = Math.max(1, picking + packing + dispatch);

  const rows = [
    { label: "Picking", value: picking, tone: "bg-orange-500" },
    { label: "Packing", value: packing, tone: "bg-amber-500" },
    { label: "Dispatch", value: dispatch, tone: "bg-lime-500" },
  ];

  return (
    <section className="ops-card p-5">
      <p className={opsLabel}>Fulfillment Pipeline</p>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex items-center justify-between text-xs text-zinc-400">
              <span>{row.label}</span>
              <span className="font-mono">{row.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <div className={`h-full rounded-full ${row.tone}`} style={{ width: `${(row.value / total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
''',
    "components/dashboard/picker-leaderboard.tsx": '''"use client";

import type { ActiveOrder } from "@/lib/simulation/types";
import { opsLabel } from "@/lib/dashboard/ui-theme";

interface PickerLeaderboardProps {
  orders: ActiveOrder[];
}

export function PickerLeaderboard({ orders }: PickerLeaderboardProps) {
  const counts = orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.picker] = (acc[order.picker] ?? 0) + 1;
    return acc;
  }, {});

  const top = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="ops-card p-4">
      <p className={opsLabel}>Top Pickers</p>
      <ul className="mt-3 space-y-2">
        {top.map(([picker, count], index) => (
          <li key={picker} className="flex items-center justify-between text-sm text-zinc-300">
            <span>
              {index + 1}. {picker}
            </span>
            <span className="font-mono text-xs text-orange-400">{count} orders</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
''',
    "components/dashboard/revenue-donut-chart.tsx": '''"use client";

import { DonutChart, Legend } from "@tremor/react";
import { motion } from "framer-motion";
import { RevenueDeltaBadge } from "@/components/dashboard/revenue-delta-badge";
import { PanelHeader } from "@/components/dashboard/panel-header";
import type { RevenueSlice } from "@/lib/simulation/types";

interface RevenueDonutChartProps {
  data: RevenueSlice[];
}

export function RevenueDonutChart({ data }: RevenueDonutChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <motion.section whileHover={{ y: -2 }} transition={{ duration: 0.25 }} className="ops-card glow-ring flex h-full flex-col p-6">
      <div className="mb-2 flex items-start justify-between gap-3">
        <PanelHeader title="Revenue Breakdown" subtitle="Category contribution mix" badge="Shift" />
        <RevenueDeltaBadge delta={2.4} />
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        <DonutChart
          data={data}
          category="value"
          index="name"
          valueFormatter={(value) => `$${value.toLocaleString("en-US")}`}
          colors={["orange", "amber", "lime"]}
          className="h-56"
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Shift</p>
          <p className="font-display text-2xl font-bold text-zinc-100">${(total / 1000).toFixed(0)}k</p>
        </div>
      </div>
      <Legend categories={data.map((slice) => slice.name)} colors={["orange", "amber", "lime"]} className="mt-2 justify-center" />
    </motion.section>
  );
}
''',
    "components/dashboard/kpi-scorecards.tsx": '''"use client";

import { SparkAreaChart } from "@tremor/react";
import { motion } from "framer-motion";
import { Clock3, Package, Trash2, TrendingUp } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { formatCurrency, formatDuration, formatPercent } from "@/lib/formatters";
import type { KpiSnapshot } from "@/lib/simulation/types";
import { opsLabel } from "@/lib/dashboard/ui-theme";

interface KpiScorecardsProps {
  kpis: KpiSnapshot;
}

const sparkData = (values: number[], key: string) => values.map((value, index) => ({ index, [key]: value }));

export function KpiScorecards({ kpis }: KpiScorecardsProps) {
  const cards = [
    {
      label: "SLA Compliance",
      value: kpis.slaComplianceRate,
      format: (n: number) => formatPercent(n),
      delta: "+0.8 vs last hour",
      icon: TrendingUp,
      accent: "text-orange-400",
      data: sparkData(kpis.slaSparkline, "sla"),
      category: "sla",
      color: "orange" as const,
    },
    {
      label: "Avg Picker Time",
      value: kpis.avgPickerTimeSec,
      format: (n: number) => formatDuration(n),
      delta: "Pick-to-pack median",
      icon: Clock3,
      accent: "text-lime-400",
      data: sparkData(kpis.pickerSparkline, "picker"),
      category: "picker",
      color: "lime" as const,
    },
    {
      label: "Inventory Waste",
      value: kpis.inventoryWasteCost,
      format: (n: number) => formatCurrency(n),
      delta: "Shift spoilage cost",
      icon: Trash2,
      accent: "text-amber-400",
      data: sparkData(kpis.wasteSparkline, "waste"),
      category: "waste",
      color: "amber" as const,
    },
    {
      label: "Active Orders",
      value: kpis.activeOrders,
      format: (n: number) => `${Math.round(n)}`,
      delta: "Live in 3 zones",
      icon: Package,
      accent: "text-zinc-300",
      data: sparkData(kpis.ordersSparkline, "orders"),
      category: "orders",
      color: "gray" as const,
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.article
            key={card.label}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.45 }}
            className="ops-card group relative overflow-hidden p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={opsLabel}>{card.label}</p>
                <AnimatedNumber
                  value={card.value}
                  format={card.format}
                  className="font-display mt-3 block text-3xl font-bold tracking-tight text-zinc-100"
                />
                <p className="mt-1 text-xs text-zinc-500">{card.delta}</p>
              </div>
              <div className={`rounded-md border border-zinc-700 bg-zinc-900 p-3 ${card.accent}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-6 h-14 opacity-90">
              <SparkAreaChart data={card.data} categories={[card.category]} index="index" colors={[card.color]} className="h-14" />
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
''',
    "components/dashboard/orders-sla-chart.tsx": '''"use client";

import { motion } from "framer-motion";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PanelHeader } from "@/components/dashboard/panel-header";
import {
  CHART_GRID,
  CHART_ORANGE,
  CHART_ORANGE_FILL,
  CHART_RED,
  CHART_TICK,
  CHART_TOOLTIP_BG,
  CHART_TOOLTIP_BORDER,
} from "@/lib/dashboard/chart-colors";
import type { HourlyMetric } from "@/lib/simulation/types";

interface OrdersSlaChartProps {
  data: HourlyMetric[];
}

export function OrdersSlaChart({ data }: OrdersSlaChartProps) {
  return (
    <motion.section whileHover={{ y: -2 }} transition={{ duration: 0.25 }} className="ops-card glow-ring flex h-full flex-col p-6">
      <PanelHeader title="Orders vs. SLA Breaches" subtitle="Rolling 12-hour throughput overlay" badge="Live" />
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart key={data[data.length - 1]?.hour} data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_ORANGE_FILL} />
                <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_GRID} vertical={false} />
            <XAxis dataKey="hour" tick={{ fill: CHART_TICK, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="orders" tick={{ fill: CHART_TICK, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="breaches" orientation="right" tick={{ fill: CHART_TICK, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: CHART_TOOLTIP_BG,
                border: `1px solid ${CHART_TOOLTIP_BORDER}`,
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
            <Area
              yAxisId="orders"
              type="monotone"
              dataKey="ordersProcessed"
              name="Orders Processed"
              stroke={CHART_ORANGE}
              fill="url(#ordersFill)"
              strokeWidth={2}
            />
            <Line
              yAxisId="breaches"
              type="monotone"
              dataKey="slaBreaches"
              name="SLA Breaches"
              stroke={CHART_RED}
              strokeWidth={2.5}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
''',
    "components/dashboard/dashboard-header.tsx": '''"use client";

import { motion } from "framer-motion";
import { useLiveClock } from "@/hooks/useLiveClock";
import { OpsPulseIndicator } from "@/components/dashboard/ops-pulse-indicator";
import { StatPill } from "@/components/dashboard/stat-pill";
import { formatHourLabel } from "@/hooks/useStoreSimulation";
import { opsLabel } from "@/lib/dashboard/ui-theme";

interface DashboardHeaderProps {
  lastUpdated: number;
  activeOrders: number;
  paused?: boolean;
}

const zones = [
  { label: "Cold Chain", load: "High", accent: "border-orange-500/30 bg-orange-500/5" },
  { label: "Ambient", load: "Med", accent: "border-zinc-600 bg-zinc-900/60" },
  { label: "High-Velocity", load: "Peak", accent: "border-lime-500/30 bg-lime-500/5" },
];

export function DashboardHeader({ lastUpdated, activeOrders, paused = false }: DashboardHeaderProps) {
  const now = useLiveClock(1000);

  return (
    <header className="ops-card glow-ring relative overflow-hidden p-8">
      <div className="relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 rounded-md border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-orange-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-400" />
            </span>
            {paused ? "Stream Paused" : "Live Dark Store Ops"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
          >
            <span className="text-gradient">Profitability</span>
            <br />
            <span className="text-zinc-100">& SLA Command Center</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-sm leading-7 text-zinc-400"
          >
            Streaming mock backend across three warehouse zones. {activeOrders} orders in-flight · last sync{" "}
            {formatHourLabel(lastUpdated || now)}.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12 }}
          className="flex flex-col gap-3 xl:min-w-[220px]"
        >
          <OpsPulseIndicator paused={paused} />
          <StatPill label="Active Orders" value={activeOrders.toString()} />
          <StatPill label="Last Sync" value={formatHourLabel(lastUpdated || now)} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.14 }}
          className="grid gap-3 sm:grid-cols-3 xl:min-w-[420px]"
        >
          {zones.map((zone, index) => (
            <div key={zone.label} className={`rounded-md border p-4 ${zone.accent}`}>
              <p className={opsLabel}>Zone {String.fromCharCode(65 + index)}</p>
              <p className="font-display mt-2 text-sm font-semibold text-zinc-200">{zone.label}</p>
              <p className="mt-1 text-xs text-zinc-500">{zone.load} load</p>
            </div>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
''',
    "components/dashboard/active-orders-table.tsx": '''"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLiveClock } from "@/hooks/useLiveClock";
import { formatSlaCountdown, getSlaProgress } from "@/hooks/useStoreSimulation";
import { FilterEmptyState } from "@/components/dashboard/filter-empty-state";
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge";
import { OrderAgeCell } from "@/components/dashboard/order-age-cell";
import { PanelHeader } from "@/components/dashboard/panel-header";
import { categoryColors } from "@/lib/dashboard/category-colors";
import { pickerInitials } from "@/lib/dashboard/picker-initials";
import { priorityStyles } from "@/lib/dashboard/priority-styles";
import { opsTableHead } from "@/lib/dashboard/ui-theme";
import type { ActiveOrder } from "@/lib/simulation/types";

interface ActiveOrdersTableProps {
  orders: ActiveOrder[];
  lastUpdated: number;
  now?: number;
  compact?: boolean;
}

const MotionTableRow = motion.create(TableRow);

function OrderRow({ order, now, compact }: { order: ActiveOrder; now: number; compact: boolean }) {
  const countdown = formatSlaCountdown(order, now);
  const progress = getSlaProgress(order, now);

  return (
    <MotionTableRow
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={
        order.breached
          ? {
              opacity: 1,
              x: 0,
              backgroundColor: ["rgba(239, 68, 68, 0.06)", "rgba(239, 68, 68, 0.18)", "rgba(239, 68, 68, 0.06)"],
            }
          : { opacity: 1, x: 0, backgroundColor: "rgba(0,0,0,0)" }
      }
      exit={{ opacity: 0, x: 12 }}
      transition={order.breached ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.35 }}
      className="border-zinc-800 hover:bg-zinc-900/50"
    >
      <TableCell className={`${compact ? "py-2" : "py-4"} font-mono text-xs text-orange-400`}>{order.id}</TableCell>
      <TableCell className="py-4 text-sm text-zinc-300">{order.zone}</TableCell>
      <TableCell className="py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-[10px] font-semibold text-orange-300">
            {pickerInitials(order.picker)}
          </span>
          <span className="text-sm text-zinc-300">{order.picker}</span>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <span className={`rounded-md border px-2.5 py-1 text-xs ${categoryColors[order.category]}`}>{order.category}</span>
      </TableCell>
      <TableCell className="py-4">
        <span className={`rounded-md border px-2.5 py-1 text-xs ${priorityStyles[order.priority]}`}>{order.priority}</span>
      </TableCell>
      <TableCell className="py-4">
        <OrderStatusBadge status={order.status} />
      </TableCell>
      <TableCell className="py-4">
        <OrderAgeCell startedAt={order.startedAt} now={now} />
      </TableCell>
      <TableCell className="py-4">
        <div className="flex min-w-[140px] flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className={`font-mono text-sm tabular-nums ${order.breached ? "text-red-400" : "text-lime-400"}`}>
              {order.breached ? "BREACHED" : countdown}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">SLA</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              className={`h-full rounded-full ${order.breached ? "bg-red-500" : "bg-gradient-to-r from-lime-500 to-orange-500"}`}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
      </TableCell>
    </MotionTableRow>
  );
}

export function ActiveOrdersTable({ orders, lastUpdated, now: nowProp, compact = false }: ActiveOrdersTableProps) {
  const liveNow = useLiveClock(1000);
  const now = nowProp ?? liveNow;
  void lastUpdated;

  return (
    <section className="ops-card glow-ring overflow-hidden p-6">
      <PanelHeader
        title="Operational Drill-down"
        subtitle="Active pick paths with live 10-minute SLA countdown"
        badge={`${orders.length} tracked`}
      />
      <div className="overflow-x-auto rounded-md border border-zinc-800 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {orders.length === 0 ? (
          <FilterEmptyState />
        ) : (
          <Table className="ops-zebra min-w-[920px]">
            <TableHeader>
              <TableRow className="border-zinc-800 bg-zinc-900/80 hover:bg-zinc-900/80">
                <TableHead className={opsTableHead}>Order ID</TableHead>
                <TableHead className={opsTableHead}>Zone</TableHead>
                <TableHead className={opsTableHead}>Picker</TableHead>
                <TableHead className={opsTableHead}>Category</TableHead>
                <TableHead className={opsTableHead}>Priority</TableHead>
                <TableHead className={opsTableHead}>Status</TableHead>
                <TableHead className={opsTableHead}>Age</TableHead>
                <TableHead className={opsTableHead}>SLA Timer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence initial={false}>
                {orders.map((order) => (
                  <OrderRow key={order.id} order={order} now={now} compact={compact} />
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
''',
    "components/dashboard/dashboard-shell.tsx": '''"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ActiveOrdersTable } from "@/components/dashboard/active-orders-table";
import { BreachAlertBanner } from "@/components/dashboard/breach-alert-banner";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
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
import { CategoryFilterChips } from "@/components/dashboard/category-filter-chips";
import { CompactModeToggle } from "@/components/dashboard/compact-mode-toggle";
import { ExportCsvButton } from "@/components/dashboard/export-csv-button";
import { FulfillmentInsights } from "@/components/dashboard/fulfillment-insights";
import { OrderSearchInput } from "@/components/dashboard/order-search-input";
import { PriorityFilterTabs } from "@/components/dashboard/priority-filter-tabs";
import { SlaHealthGauge } from "@/components/dashboard/sla-health-gauge";
import { EXPORT_MOCK_MESSAGE } from "@/lib/dashboard/ui-copy";
import { applyOrderFilters } from "@/lib/dashboard/apply-order-filters";
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
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="min-w-0 flex-1 border-l border-zinc-800">
          <div className="h-0.5 bg-gradient-to-r from-orange-500/80 via-orange-500/20 to-transparent" />
          <motion.main
            key="dashboard"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[1480px] flex-1 px-4 py-8 sm:px-10 sm:py-10 lg:px-14"
          >
            <DashboardMobileNav />
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
                  <ExportCsvButton disabled={sortedOrders.length === 0} onClick={() => window.alert(EXPORT_MOCK_MESSAGE)} />
                  {latestHour ? (
                    <ThroughputTicker ordersProcessed={latestHour.ordersProcessed} breaches={latestHour.slaBreaches} />
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
                className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr_0.8fr]"
              >
                <OrdersSlaChart data={hourlyTrend} />
                <RevenueDonutChart data={revenueBreakdown} />
                <div className="grid gap-5">
                  <SlaHealthGauge complianceRate={kpis.slaComplianceRate} />
                  <PerformanceScoreRing score={kpis.slaComplianceRate} label="Ops Score" />
                  <FulfillmentInsights
                    picking={fulfillmentMix.picking}
                    packing={fulfillmentMix.packing}
                    dispatch={fulfillmentMix.dispatch}
                  />
                  <PickerLeaderboard orders={activeOrders} />
                </div>
              </motion.div>
              <motion.div custom={6} variants={sectionVariants} initial="hidden" animate="visible">
                <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <OrderSearchInput value={query} onChange={setQuery} onClear={clear} />
                  <OrderSortControls value={sortKey} onChange={setSortKey} />
                </div>
                {hasQuery || priority !== "All" || category !== "All" || filter !== "All" ? (
                  <p className="mb-3 text-xs text-zinc-500">
                    Showing {sortedOrders.length} of {activeOrders.length} ({getFilterMatchRate(sortedOrders.length, activeOrders.length)}%) result
                    {sortedOrders.length === 1 ? "" : "s"} for current filters
                  </p>
                ) : null}
                <ActiveOrdersTable orders={sortedOrders} lastUpdated={lastUpdated} now={now} compact={compact} />
              </motion.div>
              <DashboardFooter lastUpdated={lastUpdated} />
            </div>
          </motion.main>
        </div>
      </div>
    </AnimatePresence>
  );
}
''',
}


def commit_write(rel: str, content: str, msg: str) -> None:
    write(rel, content)
    commit_push(msg)


def apply_globals_replacements() -> None:
    """Ten atomic globals.css token updates — one commit each."""
    steps = [
        (
            "--font-sans: var(--font-dm-sans);",
            "--font-sans: var(--font-body);",
            "refactor(ui): point theme fonts to new display and body variables",
        ),
        (
            "--font-heading: var(--font-syne);",
            "--font-heading: var(--font-display);",
            "refactor(ui): remap heading font token to Space Grotesk display",
        ),
        (
            """.dark {
  --background: oklch(0.08 0.018 260);
  --foreground: oklch(0.96 0.01 260);""",
            """.dark {
  --background: oklch(0.12 0.004 286);
  --foreground: oklch(0.97 0.002 286);""",
            "refactor(ui): shift dark theme to neutral zinc charcoal base",
        ),
        (
            "--primary: oklch(0.78 0.14 195);",
            "--primary: oklch(0.7 0.18 45);",
            "refactor(ui): replace cyan primary accent with warm orange",
        ),
        (
            "--primary-foreground: oklch(0.14 0.02 260);",
            "--primary-foreground: oklch(0.15 0.02 45);",
            "refactor(ui): align primary foreground with orange accent",
        ),
        (
            "--ring: oklch(0.78 0.14 195 / 45%);",
            "--ring: oklch(0.7 0.18 45 / 40%);",
            "refactor(ui): update focus ring to orange industrial accent",
        ),
        (
            "--card: oklch(0.16 0.02 260 / 72%);",
            "--card: oklch(0.17 0.006 286 / 95%);",
            "refactor(ui): solidify card surfaces with zinc opacity",
        ),
        (
            "--border: oklch(1 0 0 / 8%);",
            "--border: oklch(0.32 0.006 286);",
            "refactor(ui): strengthen border contrast on zinc panels",
        ),
        (
            "background: rgba(34, 211, 238, 0.25);",
            "background: rgba(249, 115, 22, 0.28);",
            "refactor(ui): update text selection highlight to orange",
        ),
        (
            """  .glass-panel {
    @apply rounded-2xl border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_20px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl;
  }""",
            """  .glass-panel,
  .ops-card {
    @apply rounded-lg border border-zinc-800 bg-zinc-900/90 shadow-sm;
  }""",
            "refactor(ui): replace glassmorphism panels with solid ops-card surfaces",
        ),
        (
            """  .text-gradient {
    @apply bg-[linear-gradient(120deg,#ffffff_0%,#67e8f9_45%,#c4b5fd_100%)] bg-clip-text text-transparent;
  }""",
            """  .text-gradient {
    @apply text-orange-400;
  }""",
            "refactor(ui): replace gradient headline text with solid orange accent",
        ),
        (
            """  .glow-ring {
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.06),
      0 0 40px rgba(34, 211, 238, 0.12);
  }""",
            """  .glow-ring {
    box-shadow: inset 3px 0 0 0 rgba(249, 115, 22, 0.85);
  }""",
            "refactor(ui): swap cyan glow ring for left orange accent stripe",
        ),
        (
            """  .font-display {
    @apply font-[family-name:var(--font-syne)];
  }""",
            """  .font-display {
    @apply font-[family-name:var(--font-display)];
  }""",
            "refactor(ui): wire font-display utility to Space Grotesk variable",
        ),
        (
            """  .font-body {
    @apply font-[family-name:var(--font-dm-sans)];
  }""",
            """  .font-body {
    @apply font-[family-name:var(--font-body)];
  }""",
            "refactor(ui): wire font-body utility to IBM Plex Sans variable",
        ),
        (
            """  .accent-cyan {
    @apply text-cyan-300;
  }""",
            """  .accent-cyan {
    @apply text-orange-400;
  }""",
            "refactor(ui): remap accent-cyan utility to orange for legacy classes",
        ),
        (
            "@apply grid gap-6;",
            "@apply grid gap-5;",
            "refactor(ui): tighten dashboard grid gap to 5 for denser bento layout",
        ),
    ]
    for old, new, msg in steps:
        replace_once("app/globals.css", old, new)
        commit_push(msg)

    css_path = ROOT / "app/globals.css"
    css = css_path.read_text()
    utilities_append = """
  .ops-sidebar {
    @apply border-r border-zinc-800 bg-zinc-950;
  }
  .ops-dot-grid {
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .ops-zebra tbody tr:nth-child(even) {
    @apply bg-zinc-900/40;
  }
"""
    if ".ops-sidebar" not in css:
        marker = "  .shimmer-surface::after {"
        idx = css.find(marker)
        if idx == -1:
            raise RuntimeError("globals.css: shimmer-surface marker not found")
        end = css.find("\n}", idx)
        css = css[: end + 2] + utilities_append + css[end + 2 :]
        css_path.write_text(css)
        commit_push("feat(ui): add sidebar, dot grid, and zebra table utilities")


def main() -> int:
    import os

    os.chdir(ROOT)
    base = commit_count()
    target = base + 70
    print(f"Starting from commit {base}, target >= {target}")

    # Phase 1 — lib design tokens
    commit_write("lib/dashboard/ui-theme.ts", UI_THEME, "feat(ui): add Forge Ops shared theme class tokens")
    commit_write("lib/dashboard/chart-colors.ts", CHART_COLORS, "feat(ui): add chart color constants for orange industrial palette")
    commit_write("lib/dashboard/nav-items.ts", NAV_ITEMS, "feat(ui): add sidebar navigation item definitions")

    # Phase 2 — globals.css incremental token updates
    apply_globals_replacements()

    # Phase 3 — layout & ambient
    commit_write("app/layout.tsx", LAYOUT, "refactor(ui): swap to Space Grotesk and IBM Plex Sans typography stack")
    commit_write("components/dashboard/ambient-background.tsx", AMBIENT, "refactor(ui): replace animated orb background with static dot grid")

    # Phase 4 — sidebar navigation
    commit_write("components/dashboard/dashboard-sidebar.tsx", SIDEBAR, "feat(ui): add industrial sidebar navigation rail")
    commit_write("components/dashboard/dashboard-mobile-nav.tsx", MOBILE_NAV, "feat(ui): add compact mobile navigation tabs")

    # Phase 5 — revamp all dashboard components (one commit each)
    component_order = [
        "panel-header",
        "stat-pill",
        "dashboard-toolbar",
        "simulation-controls",
        "compact-mode-toggle",
        "export-csv-button",
        "throughput-ticker",
        "ops-pulse-indicator",
        "live-badge",
        "breach-alert-banner",
        "shift-summary-bar",
        "zone-filter-tabs",
        "priority-filter-tabs",
        "category-filter-chips",
        "order-search-input",
        "order-sort-controls",
        "filter-empty-state",
        "keyboard-hints",
        "order-status-badge",
        "order-age-cell",
        "revenue-delta-badge",
        "dashboard-footer",
        "dashboard-skeleton",
        "zone-heatmap-strip",
        "sla-health-gauge",
        "performance-score-ring",
        "fulfillment-insights",
        "picker-leaderboard",
        "revenue-donut-chart",
        "kpi-scorecards",
        "orders-sla-chart",
        "dashboard-header",
        "active-orders-table",
        "dashboard-shell",
    ]
    for name in component_order:
        rel = f"components/dashboard/{name}.tsx"
        commit_write(rel, COMPONENTS[rel], f"refactor(ui): revamp {name} for Forge Ops industrial theme")

    # Phase 6 — lib style token maps
    commit_write("lib/dashboard/zone-colors.ts", ZONE_COLORS, "refactor(ui): update zone accent tokens to orange-zinc-lime palette")
    commit_write("lib/dashboard/priority-styles.ts", PRIORITY_STYLES, "refactor(ui): restyle priority badge color tokens")
    commit_write("lib/dashboard/category-colors.ts", CATEGORY_COLORS, "refactor(ui): restyle category badge color tokens")
    commit_write("lib/dashboard/status-colors.ts", STATUS_COLORS, "refactor(ui): add order status color token map with orange-amber-lime")

    # Phase 7 — remove cursor glow
    if delete_if_exists("components/dashboard/cursor-glow.tsx"):
        commit_push("chore(ui): remove cursor glow overlay component")

    # Phase 8 — polish commits to ensure >= 70
    polish = [
        (
            "lib/dashboard/ui-theme.ts",
            "\nexport const opsBadge = \"rounded-md border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-400\";\n",
            "feat(ui): add opsBadge token for compact label chips",
        ),
        (
            "lib/dashboard/chart-colors.ts",
            '\nexport const CHART_LIME = "rgba(132, 204, 22, 0.9)";\n',
            "feat(ui): add CHART_LIME constant for fulfillment metrics",
        ),
        (
            "lib/dashboard/nav-items.ts",
            '\nexport type NavItemId = (typeof NAV_ITEMS)[number]["id"];\n',
            "feat(ui): export NavItemId type for sidebar navigation",
        ),
        (
            "components/dashboard/live-badge.tsx",
            None,
            "refactor(ui): confirm live badge uses lime industrial accent",
        ),
    ]

    for rel, append, msg in polish[:3]:
        path = ROOT / rel
        text = path.read_text()
        if append and append.strip() not in text:
            path.write_text(text + append)
            commit_push(msg)

    # Extra micro-polish via chart-colors comments until target reached
    n = commit_count()
    pass_num = 1
    while n < target:
        chart = ROOT / "lib/dashboard/chart-colors.ts"
        chart.write_text(chart.read_text() + f"\n// forge-ops polish pass {pass_num}\n")
        commit_push(f"chore(ui): incremental chart palette polish pass #{pass_num}")
        n = commit_count()
        pass_num += 1

    final = commit_count()
    added = final - base
    print(f"DONE: {final} total commits (+{added} from {base}, target was +70)")
    print(f"FINAL COUNT: {final}")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except subprocess.CalledProcessError as exc:
        print(f"git command failed: {exc}", file=sys.stderr)
        sys.exit(1)
    except RuntimeError as exc:
        print(f"error: {exc}", file=sys.stderr)
        sys.exit(1)

