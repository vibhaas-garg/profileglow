import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import { unlockReportInDb } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;

    // Verify webhook signature if secret key is present
    if (webhookKey) {
      const webhook = new Webhook(webhookKey);
      const webhookHeaders = {
        "webhook-id": req.headers.get("webhook-id") ?? "",
        "webhook-signature": req.headers.get("webhook-signature") ?? "",
        "webhook-timestamp": req.headers.get("webhook-timestamp") ?? "",
      };

      try {
        await webhook.verify(rawBody, webhookHeaders);
      } catch (verifyErr) {
        console.error("Dodo webhook signature verification failed:", verifyErr);
        return new NextResponse("Invalid webhook signature", { status: 401 });
      }
    } else {
      console.warn("DODO_PAYMENTS_WEBHOOK_KEY not set - skipping webhook signature verification");
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.type || payload.eventType;

    console.log(`Dodo webhook received: ${eventType}`);

    if (eventType === "payment.succeeded") {
      const paymentData = payload.data || payload;
      const metadata = paymentData.metadata || {};
      const reportId = metadata.reportId;
      const paymentId = paymentData.payment_id || paymentData.id || `dodo_${Date.now()}`;

      if (reportId) {
        await unlockReportInDb(reportId, paymentId);
        console.log(`Successfully unlocked report ${reportId} via Dodo payment ${paymentId}`);
      } else {
        console.warn("No reportId found in Dodo webhook metadata:", paymentData);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Error processing Dodo Payments webhook:", err);
    return NextResponse.json({ error: err.message || "Webhook processing failed" }, { status: 500 });
  }
}
