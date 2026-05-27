"use client";

import { useMemo, useState } from "react";

export function useOrderSearch() {
  const [query, setQuery] = useState("");

  return {
    query,
    setQuery,
    clear: () => setQuery(""),
    hasQuery: query.trim().length > 0,
    normalized: useMemo(() => query.trim().toLowerCase(), [query]),
  };
}
