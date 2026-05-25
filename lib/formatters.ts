export const formatCurrency = (value: number): string =>
  `$${Math.round(value).toLocaleString("en-US")}`;

export const formatPercent = (value: number, digits = 1): string =>
  `${value.toFixed(digits)}%`;
export const formatDuration = (seconds: number): string => `${Math.round(seconds)}s`;

export const formatCount = (value: number): string =>
  Math.round(value).toLocaleString("en-US");
