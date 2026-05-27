"use client";

interface DashboardToolbarProps {
  children: React.ReactNode;
}

export function DashboardToolbar({ children }: DashboardToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 lg:flex-row lg:items-center lg:justify-between">
      {children}
    </div>
  );
}
