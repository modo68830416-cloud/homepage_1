"use client";

import { useEffect, useState } from "react";

function getInitialMatch(query: string) {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => getInitialMatch(query));

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px) and (pointer: fine)");
}

export function useIsTouchDevice() {
  return useMediaQuery("(pointer: coarse)");
}
