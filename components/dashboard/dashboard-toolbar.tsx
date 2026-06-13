"use client";

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
