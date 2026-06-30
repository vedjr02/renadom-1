export const formatCurrency = (value: number): string =>
  `$${Math.round(value).toLocaleString("en-US")}`;

export const formatPercent = (value: number, digits = 1): string =>
  `${value.toFixed(digits)}%`;
export const formatDuration = (seconds: number): string => `${Math.round(seconds)}s`;

export const formatCount = (value: number): string =>
  Math.round(value).toLocaleString("en-US");

export const formatOrderAge = (minutes: number): string => `${Math.round(minutes)}m`;

export const formatShiftElapsed = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export const formatDelta = (value: number, suffix = ""): string =>
  `${value >= 0 ? "+" : ""}${value.toFixed(1)}${suffix}`;
export const formatCompactNumber = (n: number): string =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(Math.round(n));
export const formatSeconds = (s: number): string => `${Math.max(0, Math.round(s))}s`;
export const formatMinutes = (m: number): string => `${Math.max(0, Math.round(m))}m`;
export const formatRatio = (num: number, den: number): string =>
  den === 0 ? '0%' : `${Math.round((num / den) * 100)}%`;
export const formatSigned = (n: number): string => `${n >= 0 ? '+' : ''}${n.toFixed(1)}`;
export const formatInteger = (n: number): string => Math.round(n).toString();
export const formatHoursMinutes = (totalMin: number): string => {
  const h = Math.floor(totalMin / 60);
  const m = Math.round(totalMin % 60);
  return `${h}h ${m}m`;
};
export const formatUtilization = (pct: number): string => `${Math.round(pct)}% util`;
export const formatOrderCount = (n: number): string => `${Math.round(n)} order${n === 1 ? '' : 's'}`;
export const formatBreachCount = (n: number): string => `${n} breach${n === 1 ? '' : 'es'}`;
export const formatSparkLabel = (i: number): string => `t-${i}`;
export const formatZoneShort = (zone: string): string => zone.split('—')[0]?.trim() ?? zone;
export const formatPercentWhole = (n: number): string => `${Math.round(n)}%`;
export const formatKilo = (n: number): string => n >= 1000 ? `$${(n/1000).toFixed(1)}k` : `$${Math.round(n)}`;
export const formatPickerCount = (n: number): string => `${n} picker${n === 1 ? '' : 's'}`;
export const formatZoneUtil = (pct: number): string => `${Math.round(pct)}% load`;
export const formatTickLabel = (h: number): string => `${h}:00`;
export const formatRank = (n: number): string => `#${n}`;
export const formatRisk = (risk: string): string => `${risk} risk`;
export const formatDeltaPct = (n: number): string => `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`;
export const formatHour = (h: number): string => `${String(h).padStart(2, '0')}:00`;
