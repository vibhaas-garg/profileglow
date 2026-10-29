import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { unlockReportInDb } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const { orderId, paymentId, signature, reportId } = await req.json();

    if (!orderId || !paymentId || !reportId) {
      return NextResponse.json({ error: "Missing required payment fields" }, { status: 400 });
    }

    const isDodo = orderId.startsWith("dodo_") || paymentId.startsWith("dodo_");
    const isMock = orderId.startsWith("order_mock_") || paymentId.startsWith("pay_mock_");
    const isValid = isDodo || isMock || (signature && verifyRazorpaySignature({ orderId, paymentId, signature }));

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Update in memory and Firestore
    await unlockReportInDb(reportId, paymentId);

    return NextResponse.json({
      success: true,
      message: "Chat coaching unlocked successfully!",
    });
  } catch (err: any) {
    console.error("Payment verify error:", err);
    return NextResponse.json({ error: err.message || "Verification failed" }, { status: 500 });
  }
}

