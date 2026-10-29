import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { adminAuth } from "@/lib/firebase/admin";
import { isDodoConfigured, createDodoCheckoutSession } from "@/lib/dodopayments";

export async function POST(req: NextRequest) {
  try {
    const { reportId, currency: requestedCurrency } = await req.json();

    if (!reportId) {
      return NextResponse.json({ error: "reportId is required" }, { status: 400 });
    }

    const billingCurrency = requestedCurrency === "USD" ? "USD" : "INR";

    // Resolve user if token provided
    let userId = "guest_user";
    let userEmail: string | undefined = undefined;
    let userName: string | undefined = undefined;

    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ") && adminAuth) {
      const token = authHeader.substring(7);
      try {
        const decoded = await adminAuth.verifyIdToken(token);
        userId = decoded.uid;
        userEmail = decoded.email;
        userName = decoded.name;
      } catch (e) {
        console.warn("Token verification failed in payment order:", e);
      }
    }

    // Amount in paise: INR 249 = 24900 paise
    const amount = 24900;
    const currency = "INR";

    // 1. If Dodo Payments is configured, create a Dodo Checkout session
    if (isDodoConfigured()) {
      try {
        const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
        const proto = req.headers.get("x-forwarded-proto") || "https";
        const origin = `${proto}://${host}`;
        const returnUrl = `${origin}/report/${reportId}?payment=success&unlocked=true`;

        const { checkoutUrl, sessionId } = await createDodoCheckoutSession({
          reportId,
          userId,
          customerEmail: userEmail,
          customerName: userName,
          returnUrl,
          billingCurrency,
        });

        return NextResponse.json({
          provider: "dodo",
          checkoutUrl,
          sessionId,
          amount,
          currency: billingCurrency,
        });
      } catch (dodoErr: any) {
        console.error("Dodo Payments checkout creation error, attempting fallback:", dodoErr);
      }
    }

    // 2. Fallback to Razorpay / Mock Order
    let orderId: string;
    try {
      const order = await razorpay.orders.create({
        amount,
        currency,
        receipt: `rcpt_${reportId.substring(0, 15)}`,
        notes: {
          reportId,
          userId,
        },
      });
      orderId = order.id;
    } catch (orderErr) {
      console.warn("Razorpay API call failed, generating fallback mock order for dev:", orderErr);
      orderId = `order_mock_${Date.now()}`;
    }

    return NextResponse.json({
      provider: "razorpay",
      orderId,
      amount,
      currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    });
  } catch (err: any) {
    console.error("Payment order error:", err);
    return NextResponse.json({ error: err.message || "Failed to create order" }, { status: 500 });
  }
}

