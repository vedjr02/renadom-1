export const getOrderAgeMinutes = (startedAt: number, now: number): number =>
  Math.max(0, (now - startedAt) / 60000);
