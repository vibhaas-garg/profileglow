/**
 * Dodo Payments Integration Client & Utilities
 * Docs: https://docs.dodopayments.com
 */

export interface CreateCheckoutParams {
  reportId: string;
  userId?: string;
  customerEmail?: string;
  customerName?: string;
  returnUrl: string;
  billingCurrency?: "INR" | "USD";
}

export function isDodoConfigured(): boolean {
  return Boolean(process.env.DODO_PAYMENTS_API_KEY && process.env.DODO_PRODUCT_ID);
}

export function getDodoBaseUrl(): string {
  const env = process.env.DODO_PAYMENTS_ENVIRONMENT?.toLowerCase();
  const apiKey = process.env.DODO_PAYMENTS_API_KEY || "";
  
  if (env === "test_mode" || apiKey.startsWith("dodo_test_")) {
    return "https://test.dodopayments.com";
  }
  return "https://live.dodopayments.com";
}

export async function createDodoCheckoutSession({
  reportId,
  userId = "guest_user",
  customerEmail,
  customerName,
  returnUrl,
  billingCurrency,
}: CreateCheckoutParams): Promise<{ checkoutUrl: string; sessionId?: string }> {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  const productId = process.env.DODO_PRODUCT_ID;

  if (!apiKey || !productId) {
    throw new Error("Dodo Payments is not configured (missing DODO_PAYMENTS_API_KEY or DODO_PRODUCT_ID)");
  }

  const baseUrl = getDodoBaseUrl();

  const payload: Record<string, any> = {
    product_cart: [
      {
        product_id: productId,
        quantity: 1,
      },
    ],
    metadata: {
      reportId,
      userId,
    },
    return_url: returnUrl,
  };

  if (billingCurrency) {
    payload.billing_currency = billingCurrency;
  }

  if (customerEmail) {
    payload.customer = {
      email: customerEmail,
      name: customerName || "ProfileGlow Customer",
    };
  }

  const res = await fetch(`${baseUrl}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.warn("Dodo Payments checkout API session returned non-200:", res.status, errorText);
    
    // Fallback to direct static buy link if API key lacks checkout_sessions:write scope
    const isTest = baseUrl.includes("test");
    const checkoutHost = isTest ? "https://test.checkout.dodopayments.com" : "https://checkout.dodopayments.com";
    let directBuyUrl = `${checkoutHost}/buy/${productId}?redirect_url=${encodeURIComponent(returnUrl)}`;
    if (billingCurrency) {
      directBuyUrl += `&billing_currency=${billingCurrency}`;
    }
    
    console.log("Using Dodo static checkout fallback link:", directBuyUrl);
    return { checkoutUrl: directBuyUrl };
  }

  const data = await res.json();
  return {
    checkoutUrl: data.checkout_url,
    sessionId: data.session_id,
  };
}
