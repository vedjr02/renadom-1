#!/usr/bin/env python3
"""Apply file edits and micro-commit each step."""
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def commit(path: str, msg: str):
    subprocess.run(["git", "add", path], cwd=ROOT, check=True)
    subprocess.run(["git", "commit", "-m", msg], cwd=ROOT, check=True)
    subprocess.run(["git", "push"], cwd=ROOT, check=True)

def append_file(rel: str, content: str, msg: str):
    p = ROOT / rel
    text = p.read_text() if p.exists() else ""
    if content.strip() in text:
        return False
    p.write_text(text + content)
    commit(rel, msg)
    return True

def write_file(rel: str, content: str, msg: str):
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content)
    commit(rel, msg)

def replace_once(rel: str, old: str, new: str, msg: str):
    p = ROOT / rel
    text = p.read_text()
    if old not in text:
        return False
    p.write_text(text.replace(old, new, 1))
    commit(rel, msg)
    return True

if __name__ == "__main__":
    start = int(subprocess.check_output(["git", "rev-list", "--count", "HEAD"], cwd=ROOT).decode().strip())
    count = 0

    steps = []

    # formatters
    steps.append(lambda: append_file("lib/formatters.ts", '\nexport const formatOrderAge = (minutes: number): string => `${Math.round(minutes)}m`;\n', "feat: add formatOrderAge helper for order age labels"))
    steps.append(lambda: append_file("lib/formatters.ts", '\nexport const formatShiftElapsed = (minutes: number): string => {\n  const h = Math.floor(minutes / 60);\n  const m = Math.round(minutes % 60);\n  return h > 0 ? `${h}h ${m}m` : `${m}m`;\n};\n', "feat: add formatShiftElapsed helper for shift duration display"))
    steps.append(lambda: append_file("lib/formatters.ts", '\nexport const formatDelta = (value: number, suffix = ""): string => `${value >= 0 ? "+" : ""}${value.toFixed(1)}${suffix}`;\n', "feat: add formatDelta helper for KPI change badges"))

    # constants
    steps.append(lambda: append_file("lib/simulation/constants.ts", '\nexport const SHIFT_START_HOUR = 6;\n', "feat: add SHIFT_START_HOUR constant for shift clock module"))
    steps.append(lambda: append_file("lib/simulation/constants.ts", '\nexport const MAX_ACTIVE_ORDERS = 22;\n', "feat: add MAX_ACTIVE_ORDERS cap constant for simulation loop"))
    steps.append(lambda: append_file("lib/simulation/constants.ts", '\nexport const VIP_SLA_MULTIPLIER = 0.85;\n', "feat: add VIP_SLA_MULTIPLIER constant for priority lane tuning"))

    # selectors
    steps.append(lambda: append_file("lib/simulation/selectors.ts", '\nexport const countVipOrders = (orders: ActiveOrder[]): number =>\n  orders.filter((order) => order.priority === "VIP").length;\n', "feat: add countVipOrders selector for priority lane analytics"))
    steps.append(lambda: append_file("lib/simulation/selectors.ts", '\nexport const getTotalRevenue = (slices: { value: number }[]): number =>\n  slices.reduce((sum, slice) => sum + slice.value, 0);\n', "feat: add getTotalRevenue selector for donut chart totals"))
    steps.append(lambda: append_file("lib/simulation/selectors.ts", '\nexport const getAverageUtilization = (zones: { utilization: number }[]): number => {\n  if (!zones.length) return 0;\n  return zones.reduce((sum, z) => sum + z.utilization, 0) / zones.length;\n};\n', "feat: add getAverageUtilization selector for zone heatmap summary"))
    steps.append(lambda: append_file("lib/simulation/selectors.ts", '\nimport type { ZoneLoadMetric } from "./types";\n\nexport const getHighestRiskZone = (zones: ZoneLoadMetric[]): ZoneLoadMetric | null => {\n  if (!zones.length) return null;\n  return [...zones].sort((a, b) => b.utilization - a.utilization)[0];\n};\n', "feat: add getHighestRiskZone selector for ops alerts"))

    # order age lib
    steps.append(lambda: write_file("lib/dashboard/order-age.ts", 'export const getOrderAgeMinutes = (startedAt: number, now: number): number =>\n  Math.max(0, (now - startedAt) / 60000);\n', "feat: add getOrderAgeMinutes helper for order age column"))

    # shift clock
    steps.append(lambda: write_file("lib/dashboard/shift-clock.ts", 'import { SHIFT_START_HOUR } from "@/lib/simulation/constants";\n\nexport const getShiftElapsedMinutes = (now: number): number => {\n  const date = new Date(now);\n  const minutes = date.getHours() * 60 + date.getMinutes();\n  const start = SHIFT_START_HOUR * 60;\n  return Math.max(0, minutes - start);\n};\n', "feat: add getShiftElapsedMinutes helper for shift summary bar"))

    for step in steps:
        try:
            if step():
                count += 1
        except subprocess.CalledProcessError:
            pass

    end = int(subprocess.check_output(["git", "rev-list", "--count", "HEAD"], cwd=ROOT).decode().strip())
    print(f"batch1: +{end-start} commits (total {end})")
