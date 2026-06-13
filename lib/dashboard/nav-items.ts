export const NAV_ITEMS = [
  { id: "overview", label: "Overview", active: true },
  { id: "orders", label: "Orders", active: false },
  { id: "zones", label: "Zones", active: false },
  { id: "reports", label: "Reports", active: false },
] as const;

export type NavItemId = (typeof NAV_ITEMS)[number]["id"];
