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
