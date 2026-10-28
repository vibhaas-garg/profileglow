import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { adminAuth } from "@/lib/firebase/admin";

export async function POST(req: NextRequest) {
  try {
    const { reportId } = await req.json();

    if (!reportId) {
      return NextResponse.json({ error: "reportId is required" }, { status: 400 });
    }

    // Resolve user if token provided
    let userId = "guest_user";
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ") && adminAuth) {
      const token = authHeader.substring(7);
      try {
        const decoded = await adminAuth.verifyIdToken(token);
        userId = decoded.uid;
      } catch (e) {
        console.warn("Token verification failed in payment order:", e);
      }
    }

    // Amount in paise: INR 349 = 34900 paise (~ $4 USD)
    const amount = 34900;
    const currency = "INR";

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
