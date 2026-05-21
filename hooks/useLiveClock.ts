"use client";

import { useEffect, useState } from "react";

export function useLiveClock(tickMs = 1000) {
  const [now, setNow] = useState(0);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), tickMs);
    return () => clearInterval(interval);
  }, [tickMs]);

  return now;
}
