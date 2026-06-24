#!/usr/bin/env python3
"""Generate 120 atomic git commits + pushes for today's contribution batch."""
from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def run(cmd: list[str], *, check: bool = True, capture: bool = False) -> subprocess.CompletedProcess:
    kwargs = {"cwd": ROOT, "check": check, "text": True}
    if capture:
        kwargs["stdout"] = subprocess.PIPE
        kwargs["stderr"] = subprocess.PIPE
    return subprocess.run(cmd, **kwargs)


def count() -> int:
    return int(run(["git", "rev-list", "--count", "HEAD"], capture=True).stdout.strip())


def write(rel: str, content: str) -> None:
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content)


def read(rel: str) -> str:
    p = ROOT / rel
    return p.read_text() if p.exists() else ""


def append_line(rel: str, line: str) -> None:
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    text = p.read_text() if p.exists() else ""
    if line.strip() in text:
        return
    p.write_text(text.rstrip() + "\n" + line + "\n")


def replace_once(rel: str, old: str, new: str) -> bool:
    p = ROOT / rel
    if not p.exists():
        return False
    t = p.read_text()
    if old not in t:
        return False
    p.write_text(t.replace(old, new, 1))
    return True


def commit_push(msg: str) -> bool:
    run(["git", "add", "-A"])
    if run(["git", "diff", "--cached", "--quiet"], check=False).returncode == 0:
        print(f"SKIP: {msg}")
        return False
    run(["git", "commit", "-m", msg])
    run(["git", "push"])
    print(f"OK ({count()}): {msg}")
    return True


def main() -> None:
    base = count()
    target = base + 120
    print(f"Starting {base}, target {target}")

    steps: list[tuple[str, callable]] = []

    # --- Batch 1: ui-copy strings (20) ---
    ui_strings = [
        ("PAUSE_LABEL", "Stream paused — metrics frozen"),
        ("RESUME_LABEL", "Stream live — metrics updating"),
        ("SIDEBAR_TAGLINE", "Real-time dark store intelligence"),
        ("TABLE_EMPTY_TITLE", "No active orders in view"),
        ("BREACH_WARNING_PREFIX", "SLA breach detected on"),
        ("EXPORT_SUCCESS_MOCK", "Export queued — demo mode"),
        ("FILTER_RESET_HINT", "Clear filters to see all orders"),
        ("SHIFT_LABEL", "Current shift"),
        ("ZONE_LABEL", "Warehouse zone"),
        ("PICKER_LABEL", "Assigned picker"),
        ("SLA_LABEL", "SLA countdown"),
        ("COMPLIANCE_LABEL", "Compliance rate"),
        ("THROUGHPUT_LABEL", "Hourly throughput"),
        ("REVENUE_LABEL", "Shift revenue"),
        ("UTILIZATION_LABEL", "Zone utilization"),
        ("SEARCH_PLACEHOLDER", "Search by order ID or picker"),
        ("COMPACT_ON_LABEL", "Compact density enabled"),
        ("COMPACT_OFF_LABEL", "Comfort density enabled"),
        ("OPS_SCORE_LABEL", "Operations score"),
        ("FOOTER_BUILD_LABEL", "Forge Ops portfolio build"),
    ]
    for name, val in ui_strings:
        def make_step(n=name, v=val):
            def step():
                append_line("lib/dashboard/ui-copy.ts", f'export const {n} = "{v}";')
            return step
        steps.append((f"feat(copy): add {name} ui string constant", make_step()))

    # --- Batch 2: aria-labels module (20) ---
    aria = [
        ("ARIA_PAUSE_SIM", "Pause or resume live simulation"),
        ("ARIA_EXPORT_CSV", "Export filtered orders to CSV"),
        ("ARIA_COMPACT_TOGGLE", "Toggle compact table density"),
        ("ARIA_SEARCH_ORDERS", "Search active orders"),
        ("ARIA_CLEAR_SEARCH", "Clear order search query"),
        ("ARIA_ZONE_FILTER", "Filter orders by warehouse zone"),
        ("ARIA_PRIORITY_FILTER", "Filter orders by priority tier"),
        ("ARIA_CATEGORY_FILTER", "Filter orders by product category"),
        ("ARIA_SORT_SLA", "Sort orders by SLA urgency"),
        ("ARIA_SORT_AGE", "Sort orders by age"),
        ("ARIA_SORT_PRIORITY", "Sort orders by priority"),
        ("ARIA_SIDEBAR_OVERVIEW", "Navigate to overview dashboard"),
        ("ARIA_SIDEBAR_ORDERS", "Navigate to orders view"),
        ("ARIA_SIDEBAR_ZONES", "Navigate to zones view"),
        ("ARIA_SIDEBAR_REPORTS", "Navigate to reports view"),
        ("ARIA_BREACH_BANNER", "Active SLA breach alert"),
        ("ARIA_KPI_SECTION", "Key performance indicators"),
        ("ARIA_ORDERS_TABLE", "Active orders operational table"),
        ("ARIA_SLA_CHART", "Orders versus SLA breaches chart"),
        ("ARIA_REVENUE_CHART", "Revenue mix donut chart"),
    ]
    write("lib/dashboard/aria-labels.ts", "/** Accessible labels for Forge Ops dashboard controls. */\n")
    steps.append(("feat(a11y): scaffold aria-labels module", lambda: None))
    for name, val in aria:
        def make_aria(n=name, v=val):
            def step():
                append_line("lib/dashboard/aria-labels.ts", f'export const {n} = "{v}";')
            return step
        steps.append((f"feat(a11y): add {name} accessible label", make_aria()))

    # --- Batch 3: metric keys (15) ---
    metrics = [
        ("METRIC_SLA", "sla_compliance"),
        ("METRIC_PICKER_TIME", "avg_picker_time"),
        ("METRIC_WASTE", "inventory_waste"),
        ("METRIC_ACTIVE_ORDERS", "active_orders"),
        ("METRIC_BREACHES", "sla_breaches"),
        ("METRIC_THROUGHPUT", "orders_processed"),
        ("METRIC_REVENUE", "shift_revenue"),
        ("METRIC_UTILIZATION", "zone_utilization"),
        ("METRIC_FULFILLMENT", "fulfillment_mix"),
        ("METRIC_OPS_SCORE", "ops_score"),
        ("METRIC_PICKING", "picking_count"),
        ("METRIC_PACKING", "packing_count"),
        ("METRIC_DISPATCH", "dispatch_count"),
        ("METRIC_EXPRESS", "express_orders"),
        ("METRIC_VIP", "vip_orders"),
    ]
    write("lib/dashboard/metric-keys.ts", "/** Canonical metric identifiers for analytics panels. */\n")
    steps.append(("feat(analytics): scaffold metric-keys module", lambda: None))
    for name, val in metrics:
        def make_m(n=name, v=val):
            def step():
                append_line("lib/dashboard/metric-keys.ts", f'export const {n} = "{v}";')
            return step
        steps.append((f"feat(analytics): add {name} metric identifier", make_m()))

    # --- Batch 4: formatters (12) ---
    formatters = [
        ("formatCompactNumber", "export const formatCompactNumber = (n: number): string =>\n  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(Math.round(n));"),
        ("formatSeconds", "export const formatSeconds = (s: number): string => `${Math.max(0, Math.round(s))}s`;"),
        ("formatMinutes", "export const formatMinutes = (m: number): string => `${Math.max(0, Math.round(m))}m`;"),
        ("formatRatio", "export const formatRatio = (num: number, den: number): string =>\n  den === 0 ? '0%' : `${Math.round((num / den) * 100)}%`;"),
        ("formatSigned", "export const formatSigned = (n: number): string => `${n >= 0 ? '+' : ''}${n.toFixed(1)}`;"),
        ("formatInteger", "export const formatInteger = (n: number): string => Math.round(n).toString();"),
        ("formatHoursMinutes", "export const formatHoursMinutes = (totalMin: number): string => {\n  const h = Math.floor(totalMin / 60);\n  const m = Math.round(totalMin % 60);\n  return `${h}h ${m}m`;\n};"),
        ("formatUtilization", "export const formatUtilization = (pct: number): string => `${Math.round(pct)}% util`;"),
        ("formatOrderCount", "export const formatOrderCount = (n: number): string => `${Math.round(n)} order${n === 1 ? '' : 's'}`;"),
        ("formatBreachCount", "export const formatBreachCount = (n: number): string => `${n} breach${n === 1 ? '' : 'es'}`;"),
        ("formatSparkLabel", "export const formatSparkLabel = (i: number): string => `t-${i}`;"),
        ("formatZoneShort", "export const formatZoneShort = (zone: string): string => zone.split('—')[0]?.trim() ?? zone;"),
    ]
    for name, code in formatters:
        def make_f(c=code):
            def step():
                append_line("lib/formatters.ts", c)
            return step
        steps.append((f"feat(format): add {name} helper", make_f()))

    # --- Batch 5: chart color tokens (15) ---
    chart_tokens = [
        ("CHART_AMBER", "rgba(245, 158, 11, 0.9)"),
        ("CHART_ZINC", "rgba(161, 161, 170, 0.9)"),
        ("CHART_SKY", "rgba(56, 189, 248, 0.9)"),
        ("CHART_EMERALD", "rgba(52, 211, 153, 0.9)"),
        ("CHART_VIOLET", "rgba(167, 139, 250, 0.9)"),
        ("CHART_ORANGE_MUTED", "rgba(249, 115, 22, 0.45)"),
        ("CHART_RED_MUTED", "rgba(239, 68, 68, 0.35)"),
        ("CHART_LIME_FILL", "rgba(132, 204, 22, 0.2)"),
        ("CHART_AMBER_FILL", "rgba(245, 158, 11, 0.2)"),
        ("CHART_LEGEND", "rgba(212, 212, 216, 0.85)"),
        ("CHART_AXIS", "rgba(113, 113, 122, 0.9)"),
        ("CHART_CROSSHAIR", "rgba(249, 115, 22, 0.15)"),
        ("CHART_DONUT_STROKE", "rgba(39, 39, 42, 1)"),
        ("CHART_AREA_STROKE", "rgba(249, 115, 22, 0.85)"),
        ("CHART_BREACH_STROKE", "rgba(248, 113, 113, 0.95)"),
    ]
    # clean old polish comments first in one commit
    def clean_chart():
        t = read("lib/dashboard/chart-colors.ts")
        lines = [ln for ln in t.splitlines() if not ln.strip().startswith("// forge-ops polish")]
        write("lib/dashboard/chart-colors.ts", "\n".join(lines) + "\n")
    steps.append(("chore(ui): remove stale chart polish comment markers", clean_chart))

    for name, val in chart_tokens:
        def make_c(n=name, v=val):
            def step():
                append_line("lib/dashboard/chart-colors.ts", f"export const {n} = \"{v}\";")
            return step
        steps.append((f"feat(charts): add {name} token", make_c()))

    # --- Batch 6: simulation helpers (18) ---
    write("lib/simulation/helpers.ts", "import type { ActiveOrder, OrderPriority } from '@/lib/simulation/types';\n")
    sim_helpers = [
        ("isExpressOrder", "export const isExpressOrder = (o: ActiveOrder): boolean => o.priority === 'Express';"),
        ("isVipOrder", "export const isVipOrder = (o: ActiveOrder): boolean => o.priority === 'VIP';"),
        ("isBreached", "export const isBreached = (o: ActiveOrder): boolean => o.breached;"),
        ("isPicking", "export const isPicking = (o: ActiveOrder): boolean => o.status === 'Picking';"),
        ("isPacking", "export const isPacking = (o: ActiveOrder): boolean => o.status === 'Packing';"),
        ("isDispatch", "export const isDispatch = (o: ActiveOrder): boolean => o.status === 'Dispatch';"),
        ("priorityWeight", "export const priorityWeight = (p: OrderPriority): number =>\n  p === 'VIP' ? 3 : p === 'Express' ? 2 : 1;"),
        ("orderAgeMs", "export const orderAgeMs = (o: ActiveOrder, now: number): number => Math.max(0, now - o.startedAt);"),
        ("matchesPicker", "export const matchesPicker = (o: ActiveOrder, q: string): boolean =>\n  o.picker.toLowerCase().includes(q.toLowerCase());"),
        ("matchesOrderId", "export const matchesOrderId = (o: ActiveOrder, q: string): boolean =>\n  o.id.toLowerCase().includes(q.toLowerCase());"),
        ("countByStatus", "export const countByStatus = (orders: ActiveOrder[], status: ActiveOrder['status']): number =>\n  orders.filter(o => o.status === status).length;"),
        ("countByPriority", "export const countByPriority = (orders: ActiveOrder[], p: OrderPriority): number =>\n  orders.filter(o => o.priority === p).length;"),
        ("hasActiveBreaches", "export const hasActiveBreaches = (orders: ActiveOrder[]): boolean => orders.some(o => o.breached);"),
        ("getUniquePickers", "export const getUniquePickers = (orders: ActiveOrder[]): string[] =>\n  [...new Set(orders.map(o => o.picker))];"),
        ("sortByPriority", "export const sortByPriority = (a: ActiveOrder, b: ActiveOrder): number =>\n  priorityWeight(b.priority) - priorityWeight(a.priority);"),
        ("averageOrderAgeMin", "export const averageOrderAgeMin = (orders: ActiveOrder[], now: number): number => {\n  if (!orders.length) return 0;\n  return orders.reduce((s, o) => s + orderAgeMs(o, now), 0) / orders.length / 60000;\n};"),
        ("expressRatio", "export const expressRatio = (orders: ActiveOrder[]): number => {\n  if (!orders.length) return 0;\n  return orders.filter(isExpressOrder).length / orders.length;\n};"),
        ("breachRatio", "export const breachRatio = (orders: ActiveOrder[]): number => {\n  if (!orders.length) return 0;\n  return orders.filter(isBreached).length / orders.length;\n};"),
    ]
    steps.append(("feat(sim): scaffold simulation helpers module", lambda: None))
    for name, code in sim_helpers:
        def make_s(c=code):
            def step():
                append_line("lib/simulation/helpers.ts", c)
            return step
        steps.append((f"feat(sim): add {name} helper", make_s()))

    # --- Batch 7: ui-theme tokens (10) ---
    theme_lines = [
        ('opsBadge', 'export const opsBadge = "rounded-md border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400";'),
        ('opsStripeOrange', 'export const opsStripeOrange = "border-l-4 border-l-orange-500";'),
        ('opsStripeLime', 'export const opsStripeLime = "border-l-4 border-l-lime-500";'),
        ('opsStripeAmber', 'export const opsStripeAmber = "border-l-4 border-l-amber-500";'),
        ('opsTableRow', 'export const opsTableRow = "border-zinc-800 hover:bg-zinc-900/60 transition-colors";'),
        ('opsSectionTitle', 'export const opsSectionTitle = "font-display text-lg font-semibold text-zinc-50";'),
        ('opsMono', 'export const opsMono = "font-mono text-xs tabular-nums";'),
        ('opsDanger', 'export const opsDanger = "text-red-400";'),
        ('opsSuccess', 'export const opsSuccess = "text-lime-400";'),
        ('opsWarn', 'export const opsWarn = "text-amber-400";'),
    ]
    for name, code in theme_lines:
        def make_t(c=code, n=name):
            def step():
                t = read("lib/dashboard/ui-theme.ts")
                if n in t:
                    return
                append_line("lib/dashboard/ui-theme.ts", c)
            return step
        steps.append((f"feat(theme): add {name} class token", make_t()))

    # --- Batch 8: wire aria labels into components (10) ---
    wiring = [
        ("components/dashboard/simulation-controls.tsx", 'aria-label="Pause or resume live simulation"', 'import { ARIA_PAUSE_SIM } from "@/lib/dashboard/aria-labels";\n', 'aria-label={ARIA_PAUSE_SIM}'),
        ("components/dashboard/export-csv-button.tsx", 'aria-label="Export filtered orders as CSV"', 'import { ARIA_EXPORT_CSV } from "@/lib/dashboard/aria-labels";\n', 'aria-label={ARIA_EXPORT_CSV}'),
        ("components/dashboard/compact-mode-toggle.tsx", 'aria-label="Toggle compact table density"', 'import { ARIA_COMPACT_TOGGLE } from "@/lib/dashboard/aria-labels";\n', 'aria-label={ARIA_COMPACT_TOGGLE}'),
        ("components/dashboard/order-search-input.tsx", 'placeholder="Search orders, pickers, IDs…"', 'import { SEARCH_PLACEHOLDER } from "@/lib/dashboard/ui-copy";\n', 'placeholder={SEARCH_PLACEHOLDER}'),
        ("components/dashboard/breach-alert-banner.tsx", '<motion.div', 'import { ARIA_BREACH_BANNER } from "@/lib/dashboard/aria-labels";\n', '<motion.div role="alert" aria-label={ARIA_BREACH_BANNER}'),
        ("components/dashboard/kpi-scorecards.tsx", '<section className="grid', 'import { ARIA_KPI_SECTION } from "@/lib/dashboard/aria-labels";\n', '<section aria-label={ARIA_KPI_SECTION} className="grid'),
        ("components/dashboard/active-orders-table.tsx", '<section className="ops-card glow-ring overflow-hidden p-6">', 'import { ARIA_ORDERS_TABLE } from "@/lib/dashboard/aria-labels";\n', '<section aria-label={ARIA_ORDERS_TABLE} className="ops-card glow-ring overflow-hidden p-6">'),
        ("components/dashboard/orders-sla-chart.tsx", '<motion.section whileHover={{ y: -2 }}', 'import { ARIA_SLA_CHART } from "@/lib/dashboard/aria-labels";\n', '<motion.section aria-label={ARIA_SLA_CHART} whileHover={{ y: -2 }}'),
        ("components/dashboard/revenue-donut-chart.tsx", '<section className="ops-card glow-ring flex h-full flex-col p-5">', 'import { ARIA_REVENUE_CHART } from "@/lib/dashboard/aria-labels";\n', '<section aria-label={ARIA_REVENUE_CHART} className="ops-card glow-ring flex h-full flex-col p-5">'),
        ("components/dashboard/dashboard-footer.tsx", "Forge Ops · Q-Commerce Analytics Engine", 'import { FOOTER_BUILD_LABEL } from "@/lib/dashboard/ui-copy";\n', "{FOOTER_BUILD_LABEL}"),
    ]
    for rel, needle, imp, repl in wiring:
        def make_w(r=rel, n=needle, i=imp, rp=repl):
            def step():
                t = read(r)
                if rp in t and ("aria-labels" in t or "ui-copy" in t):
                    return
                if i.strip() not in t:
                    if '"use client"' in t:
                        t = t.replace('"use client";\n\n', f'"use client";\n\n{i}')
                    else:
                        t = i + t
                if n in t:
                    t = t.replace(n, rp, 1)
                write(r, t)
            return step
        steps.append((f"refactor(a11y): wire accessible labels in {Path(rel).stem}", make_w()))

    # Trim or pad to exactly 120 new commits from steps list
    # Current steps count
    print(f"Planned steps: {len(steps)}")

    made = 0
    for msg, fn in steps:
        if count() >= target:
            break
        fn()
        if commit_push(msg):
            made += 1

    # Pad with tooltip entries if under 120
    n = 0
    while count() < target:
        n += 1
        append_line("lib/dashboard/chart-notes.ts", f"// ops tooltip note {n}: hover for hourly breakdown")
        commit_push(f"docs(charts): add tooltip annotation note #{n}")
        made += 1

    final = count()
    print(f"DONE: {final} total (+{final - base} today, made {made} pushes)")


if __name__ == "__main__":
    main()
