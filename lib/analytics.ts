"use client";

export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-KGW87C9PCH";

// Track custom page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track specific events (e.g. analysis, unlocks, shares)
export const trackEvent = (
  action: string,
  params: Record<string, string | number | boolean> = {}
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, params);
  } else {
    // In dev or when blocked by adblockers, log cleanly
    if (process.env.NODE_ENV === "development") {
      console.log(`[Google Analytics Event] ${action}:`, params);
    }
  }
};
