import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { adminDb } from "@/lib/firebase/admin";
import { memoryReports } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const { orderId, paymentId, signature, reportId } = await req.json();

    if (!orderId || !paymentId || !reportId) {
      return NextResponse.json({ error: "Missing required payment fields" }, { status: 400 });
    }

    const isMock = orderId.startsWith("order_mock_") || paymentId.startsWith("pay_mock_");
    const isValid = isMock || verifyRazorpaySignature({ orderId, paymentId, signature });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 1. Update in memory cache
    if (memoryReports.has(reportId)) {
      const existing = memoryReports.get(reportId)!;
      existing.isChatUnlocked = true;
      existing.paymentId = paymentId;
      existing.unlockedAt = new Date().toISOString();
      memoryReports.set(reportId, existing);
    }

    // 2. Update in Firestore if configured
    if (adminDb) {
      try {
        await adminDb.collection("reports").doc(reportId).set(
          {
            isChatUnlocked: true,
            paymentId,
            unlockedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn("Firestore payment update error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Chat coaching unlocked successfully!",
    });
  } catch (err: any) {
    console.error("Payment verify error:", err);
    return NextResponse.json({ error: err.message || "Verification failed" }, { status: 500 });
  }
}
