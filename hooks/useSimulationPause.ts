"use client";

import { useCallback, useState } from "react";

export function useSimulationPause(initial = false) {
  const [paused, setPaused] = useState(initial);

  const toggle = useCallback(() => setPaused((value) => !value), []);
  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  return { paused, toggle, pause, resume, setPaused };
}
