"use client";

import { useCallback, useState } from "react";

export function useCompactMode(initial = false) {
  const [compact, setCompact] = useState(initial);
  const toggle = useCallback(() => setCompact((value) => !value), []);

  return { compact, toggle, setCompact };
}
