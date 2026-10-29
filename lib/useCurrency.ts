"use client";

import { useEffect, useState } from "react";

interface CurrencyData {
  priceInr: number;
  usdEquivalent: string;
  label: string;
  loading: boolean;
}

// Module-level cache so multiple components don't make redundant requests
let cachedUsd: string | null = null;
let lastFetchTime = 0;
const ONE_HOUR_MS = 60 * 60 * 1000;

export function useUsdPrice(inrAmount: number = 249): CurrencyData {
  const [usdEquivalent, setUsdEquivalent] = useState<string>(cachedUsd || "2.99");
  const [loading, setLoading] = useState<boolean>(!cachedUsd);

  useEffect(() => {
    const now = Date.now();
    if (cachedUsd && now - lastFetchTime < ONE_HOUR_MS) {
      setUsdEquivalent(cachedUsd);
      setLoading(false);
      return;
    }

    let isMounted = true;
    fetch("/api/currency")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (isMounted && data.usdEquivalent) {
          cachedUsd = data.usdEquivalent;
          lastFetchTime = Date.now();
          setUsdEquivalent(data.usdEquivalent);
        }
      })
      .catch(() => {
        // Fallback default
        if (isMounted) setUsdEquivalent("2.99");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [inrAmount]);

  return {
    priceInr: inrAmount,
    usdEquivalent,
    label: `₹${inrAmount} (~$${usdEquivalent} USD)`,
    loading,
  };
}
