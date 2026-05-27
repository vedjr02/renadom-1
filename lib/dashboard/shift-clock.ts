import { SHIFT_START_HOUR } from "@/lib/simulation/constants";

export const getShiftElapsedMinutes = (now: number): number => {
  const date = new Date(now);
  const minutes = date.getHours() * 60 + date.getMinutes();
  return Math.max(0, minutes - SHIFT_START_HOUR * 60);
};
