import { NextResponse } from "next/server";

// Cache on CDN / server for 1 hour (3600 seconds)
export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/INR", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch exchange rate: ${res.statusText}`);
    }

    const data = await res.json();
    const rate = data.rates?.USD || 0.0105;
    const usdEquivalent = (249 * rate).toFixed(2);

    return NextResponse.json(
      {
        base: "INR",
        priceInr: 249,
        usdEquivalent,
        rate,
        label: `₹249 (~$${usdEquivalent} USD)`,
        lastUpdated: data.time_last_update_utc || new Date().toISOString(),
        nextUpdate: data.time_next_update_utc || null,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  } catch (err: any) {
    console.warn("Currency conversion API fallback triggered:", err.message);
    // Reliable static fallback (approx 1 USD = 83-84 INR)
    return NextResponse.json(
      {
        base: "INR",
        priceInr: 249,
        usdEquivalent: "2.99",
        rate: 0.012,
        label: "₹249 (~$2.99 USD)",
        fallback: true,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  }
}
