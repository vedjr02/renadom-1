"use client";

import { useEffect, useState } from "react";
import { getShiftElapsedMinutes } from "@/lib/dashboard/shift-clock";

export function useShiftClock(tickMs = 30000) {
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    const update = () => setElapsedMinutes(getShiftElapsedMinutes(Date.now()));
    update();
    const interval = setInterval(update, tickMs);
    return () => clearInterval(interval);
  }, [tickMs]);

  return elapsedMinutes;
}
