export const formatCurrency = (value: number): string =>
  `$${Math.round(value).toLocaleString("en-US")}`;
