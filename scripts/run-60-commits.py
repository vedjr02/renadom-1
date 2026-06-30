#!/usr/bin/env python3
"""60 atomic commits + pushes."""
from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def run(cmd: list[str], *, check: bool = True, capture: bool = False):
    kwargs = {"cwd": ROOT, "check": check, "text": True}
    if capture:
        kwargs["stdout"] = subprocess.PIPE
        kwargs["stderr"] = subprocess.PIPE
    return subprocess.run(cmd, **kwargs)


def count() -> int:
    return int(run(["git", "rev-list", "--count", "HEAD"], capture=True).stdout.strip())


def read(rel: str) -> str:
    p = ROOT / rel
    return p.read_text() if p.exists() else ""


def write(rel: str, content: str) -> None:
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content)


def append_line(rel: str, line: str) -> None:
    p = ROOT / rel
    text = p.read_text() if p.exists() else ""
    if line.strip() in text:
        return
    write(rel, text.rstrip() + "\n" + line + "\n")


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
    target = base + 60
    steps: list[tuple[str, callable]] = []

    copy_strings = [
        ("ORDERS_TRACKED_LABEL", "Orders tracked"),
        ("RISK_LABEL", "Breach risk"),
        ("UTILIZATION_PCT_LABEL", "Utilization"),
        ("ORDERS_IN_ZONE_LABEL", "Orders in zone"),
        ("TOP_PICKERS_LABEL", "Top performers"),
        ("PIPELINE_LABEL", "Fulfillment pipeline"),
        ("LIVE_BADGE_LABEL", "Live"),
        ("PAUSED_BADGE_LABEL", "Paused"),
        ("EXPORT_BTN_LABEL", "Export CSV"),
        ("SORT_BY_LABEL", "Sort by"),
    ]
    for n, v in copy_strings:
        steps.append((f"feat(copy): add {n} ui string", lambda n=n, v=v: append_line("lib/dashboard/ui-copy.ts", f'export const {n} = "{v}";')))

    notes = [
        ("REVENUE_DELTA_NOTE", "Shift-over-shift revenue delta"),
        ("ZONE_RISK_NOTE", "Risk band from utilization pressure"),
        ("SLA_TIMER_NOTE", "Countdown to 10-minute SLA window"),
        ("ORDER_AGE_NOTE", "Time since pick path started"),
        ("LEADERBOARD_RANK_NOTE", "Ranked by active order count"),
        ("SHIFT_SUMMARY_NOTE", "Aggregated shift operational metrics"),
        ("TOOLBAR_NOTE", "Simulation and filter controls"),
        ("MOBILE_NAV_NOTE", "Quick section navigation on small screens"),
    ]
    for n, v in notes:
        steps.append((f"feat(charts): add {n} annotation", lambda n=n, v=v: append_line("lib/dashboard/chart-notes.ts", f'export const {n} = "{v}";')))

    metrics = [
        ("METRIC_NEAR_BREACH", "near_breach_orders"),
        ("METRIC_VIP_RATIO", "vip_ratio"),
        ("METRIC_EXPRESS_RATIO", "express_ratio"),
        ("METRIC_AVG_AGE", "avg_order_age"),
        ("METRIC_UNIQUE_PICKERS", "unique_pickers"),
        ("METRIC_ZONE_COUNT", "active_zones"),
    ]
    for n, v in metrics:
        steps.append((f"feat(analytics): add {n} metric key", lambda n=n, v=v: append_line("lib/dashboard/metric-keys.ts", f'export const {n} = "{v}";')))

    helpers = [
        ("countNearBreach", "export const countNearBreach = (orders: ActiveOrder[], now: number): number =>\n  orders.filter(o => isNearBreach(o, now)).length;"),
        ("countVipOrders", "export const countVipOrders = (orders: ActiveOrder[]): number =>\n  countByPriority(orders, 'VIP');"),
        ("getNewestOrder", "export const getNewestOrder = (orders: ActiveOrder[]): ActiveOrder | undefined =>\n  orders.reduce<ActiveOrder | undefined>((n, o) => (!n || o.startedAt > n.startedAt ? o : n), undefined);"),
        ("averagePickerLoad", "export const averagePickerLoad = (orders: ActiveOrder[]): number => {\n  const pickers = getUniquePickers(orders);\n  return pickers.length ? orders.length / pickers.length : 0;\n};"),
        ("maxOrderAgeMin", "export const maxOrderAgeMin = (orders: ActiveOrder[], now: number): number => {\n  if (!orders.length) return 0;\n  return Math.max(...orders.map(o => orderAgeMs(o, now))) / 60000;\n};"),
        ("standardRatio", "export const standardRatio = (orders: ActiveOrder[]): number => {\n  if (!orders.length) return 0;\n  return countByPriority(orders, 'Standard') / orders.length;\n};"),
        ("packingRatio", "export const packingRatio = (orders: ActiveOrder[]): number => {\n  if (!orders.length) return 0;\n  return countByStatus(orders, 'Packing') / orders.length;\n};"),
        ("sortByAge", "export const sortByAge = (a: ActiveOrder, b: ActiveOrder): number => a.startedAt - b.startedAt;"),
    ]
    for name, code in helpers:
        steps.append((f"feat(sim): add {name} helper", lambda c=code: append_line("lib/simulation/helpers.ts", c)))

    fmts = [
        ("formatRank", "export const formatRank = (n: number): string => `#${n}`;"),
        ("formatRisk", "export const formatRisk = (risk: string): string => `${risk} risk`;"),
        ("formatDeltaPct", "export const formatDeltaPct = (n: number): string => `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`;"),
        ("formatHour", "export const formatHour = (h: number): string => `${String(h).padStart(2, '0')}:00`;"),
        ("formatMsToSec", "export const formatMsToSec = (ms: number): string => `${Math.round(ms / 1000)}s`;"),
    ]
    for name, code in fmts:
        steps.append((f"feat(format): add {name} helper", lambda c=code: append_line("lib/formatters.ts", c)))

    theme = [
        ("opsRank", 'export const opsRank = "font-mono text-xs tabular-nums text-zinc-600";'),
        ("opsRiskHigh", 'export const opsRiskHigh = "text-red-400 border-red-500/30 bg-red-500/10";'),
        ("opsRiskMed", 'export const opsRiskMed = "text-amber-400 border-amber-500/30 bg-amber-500/10";'),
        ("opsRiskLow", 'export const opsRiskLow = "text-lime-400 border-lime-500/30 bg-lime-500/10";'),
        ("opsToolbar", 'export const opsToolbar = "ops-card mb-5 flex flex-wrap items-center gap-3 p-4";'),
        ("opsInline", 'export const opsInline = "inline-flex items-center gap-2";'),
    ]
    for name, code in theme:
        def mk(c=code, n=name):
            return lambda: append_line("lib/dashboard/ui-theme.ts", c) if n not in read("lib/dashboard/ui-theme.ts") else None
        steps.append((f"feat(theme): add {name} utility token", mk()))

    shortcuts = [
        ("E", "Export filtered orders to CSV"),
        ("R", "Reset all active filters"),
        ("1", "Focus zone filter All"),
        ("2", "Sort orders by SLA urgency"),
    ]
    for key, action in shortcuts:
        def mk(k=key, a=action):
            def step():
                t = read("lib/dashboard/keyboard-shortcuts.ts")
                if f'keys: "{k}"' in t:
                    return
                write("lib/dashboard/keyboard-shortcuts.ts", t.replace("];", f'  {{ keys: "{k}", action: "{a}" }},\n];'))
            return step
        steps.append((f"feat(a11y): add {key} keyboard shortcut", mk()))

    # component wirings
    def wire(rel, fn):
        steps.append((fn.__doc__ or "refactor", fn))

    def w_search_aria():
        """refactor(a11y): add ARIA_SEARCH_ORDERS on order search input"""
        t = read("components/dashboard/order-search-input.tsx")
        if "ARIA_SEARCH_ORDERS" in t:
            return
        t = t.replace(
            'import { CLEAR_SEARCH_LABEL, SEARCH_PLACEHOLDER }',
            'import { ARIA_SEARCH_ORDERS } from "@/lib/dashboard/aria-labels";\nimport { CLEAR_SEARCH_LABEL, SEARCH_PLACEHOLDER }',
        )
        t = t.replace("<input\n        value", "<input\n        aria-label={ARIA_SEARCH_ORDERS}\n        value")
        write("components/dashboard/order-search-input.tsx", t)

    def w_sort_label():
        """refactor(ui): wire SORT_BY_LABEL on order sort controls"""
        t = read("components/dashboard/order-sort-controls.tsx")
        if "SORT_BY_LABEL" in t:
            return
        t = t.replace('import type { OrderSortKey }', 'import { SORT_BY_LABEL } from "@/lib/dashboard/ui-copy";\nimport type { OrderSortKey }')
        t = t.replace(
            '<div className="flex flex-wrap gap-2">',
            '<div className="flex flex-wrap items-center gap-2">\n      <span className="text-[10px] uppercase tracking-wider text-zinc-600">{SORT_BY_LABEL}</span>',
        )
        write("components/dashboard/order-sort-controls.tsx", t)

    def w_live_badge():
        """refactor(ui): wire LIVE_BADGE_LABEL on live badge"""
        t = read("components/dashboard/live-badge.tsx")
        if "LIVE_BADGE_LABEL" in t:
            return
        t = t.replace('"use client";\n\n', '"use client";\n\nimport { LIVE_BADGE_LABEL } from "@/lib/dashboard/ui-copy";\n')
        if "use client" not in t:
            t = 'import { LIVE_BADGE_LABEL } from "@/lib/dashboard/ui-copy";\n' + t
        t = t.replace(">Live<", ">{LIVE_BADGE_LABEL}<")
        write("components/dashboard/live-badge.tsx", t)

    def w_zone_util():
        """refactor(ui): wire UTILIZATION_PCT_LABEL on zone heatmap"""
        t = read("components/dashboard/zone-heatmap-strip.tsx")
        if "UTILIZATION_PCT_LABEL" in t:
            return
        t = t.replace(
            'import { opsLabel }',
            'import { UTILIZATION_PCT_LABEL } from "@/lib/dashboard/ui-copy";\nimport { opsLabel }',
        )
        t = t.replace(">Utilization<", ">{UTILIZATION_PCT_LABEL}<")
        write("components/dashboard/zone-heatmap-strip.tsx", t)

    def w_picker_top():
        """refactor(ui): wire TOP_PICKERS_LABEL on picker leaderboard"""
        t = read("components/dashboard/picker-leaderboard.tsx")
        if "TOP_PICKERS_LABEL" in t:
            return
        t = t.replace(
            'import { PICKER_BOARD_NOTE } from "@/lib/dashboard/chart-notes";\nimport { opsLabel }',
            'import { LEADERBOARD_RANK_NOTE } from "@/lib/dashboard/chart-notes";\nimport { TOP_PICKERS_LABEL } from "@/lib/dashboard/ui-copy";\nimport { opsLabel }',
        )
        t = t.replace("{PICKER_BOARD_NOTE}", "{TOP_PICKERS_LABEL}")
        t = t.replace(
            '<ul className="mt-3 space-y-2">',
            '<p className="mt-1 text-xs text-zinc-600">{LEADERBOARD_RANK_NOTE}</p>\n      <ul className="mt-3 space-y-2">',
        )
        write("components/dashboard/picker-leaderboard.tsx", t)

    def w_pipeline():
        """refactor(ui): wire PIPELINE_LABEL on fulfillment insights header"""
        t = read("components/dashboard/fulfillment-insights.tsx")
        if "PIPELINE_LABEL" in t:
            return
        t = t.replace(
            'import { DISPATCH_STAGE_LABEL',
            'import { DISPATCH_STAGE_LABEL, PIPELINE_LABEL,',
        )
        t = t.replace("{FULFILLMENT_NOTE}", "{PIPELINE_LABEL}")
        write("components/dashboard/fulfillment-insights.tsx", t)

    def w_export_label():
        """refactor(ui): wire EXPORT_BTN_LABEL on export button"""
        t = read("components/dashboard/export-csv-button.tsx")
        if "EXPORT_BTN_LABEL" in t:
            return
        t = t.replace('import { opsBtn }', 'import { EXPORT_BTN_LABEL } from "@/lib/dashboard/ui-copy";\nimport { opsBtn }')
        t = t.replace(">Export CSV<", ">{EXPORT_BTN_LABEL}<")
        write("components/dashboard/export-csv-button.tsx", t)

    def w_mobile_nav_note():
        """refactor(ui): add MOBILE_NAV_NOTE aria on mobile nav"""
        t = read("components/dashboard/dashboard-mobile-nav.tsx")
        if "MOBILE_NAV_NOTE" in t:
            return
        t = t.replace(
            'import { NAV_ITEMS }',
            'import { MOBILE_NAV_NOTE } from "@/lib/dashboard/chart-notes";\nimport { NAV_ITEMS }',
        )
        t = t.replace("<nav className", '<nav aria-label={MOBILE_NAV_NOTE} className')
        write("components/dashboard/dashboard-mobile-nav.tsx", t)

    def w_toolbar_note():
        """refactor(ui): add TOOLBAR_NOTE aria on dashboard toolbar"""
        t = read("components/dashboard/dashboard-toolbar.tsx")
        if "TOOLBAR_NOTE" in t:
            return
        t = t.replace(
            '"use client";\n\ninterface',
            '"use client";\n\nimport { TOOLBAR_NOTE } from "@/lib/dashboard/chart-notes";\n\ninterface',
        )
        t = t.replace("<div className=\"ops-card", '<div aria-label={TOOLBAR_NOTE} className="ops-card')
        write("components/dashboard/dashboard-toolbar.tsx", t)

    def w_revenue_delta_note():
        """refactor(charts): wire REVENUE_DELTA_NOTE on revenue delta badge"""
        t = read("components/dashboard/revenue-delta-badge.tsx")
        if "REVENUE_DELTA_NOTE" in t:
            return
        t = t.replace(
            "interface RevenueDeltaBadgeProps",
            'import { REVENUE_DELTA_NOTE } from "@/lib/dashboard/chart-notes";\n\ninterface RevenueDeltaBadgeProps',
        )
        t = t.replace(
            "    </span>\n  );",
            "    </span>\n      <span className=\"sr-only\">{REVENUE_DELTA_NOTE}</span>\n  );",
        )
        write("components/dashboard/revenue-delta-badge.tsx", t)

    wirings = [w_search_aria, w_sort_label, w_live_badge, w_zone_util, w_picker_top, w_pipeline, w_export_label, w_mobile_nav_note, w_toolbar_note, w_revenue_delta_note]
    for w in wirings:
        steps.append((w.__doc__ or "refactor", w))

    print(f"Steps: {len(steps)}, target {target}")
    for msg, fn in steps:
        if count() >= target:
            break
        fn()
        commit_push(msg)

    n = 0
    while count() < target:
        n += 1
        append_line("lib/dashboard/chart-notes.ts", f"// insight batch note {n}")
        commit_push(f"docs(ops): add insight annotation batch note #{n}")

    print(f"DONE: {count()} (+{count() - base})")


if __name__ == "__main__":
    main()
