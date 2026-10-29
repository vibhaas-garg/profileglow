"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AlertCircle, Check, X, Globe } from "lucide-react";
import { useUsdPrice } from "@/lib/useCurrency";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
  onSuccess: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  reportId,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const { usdEquivalent } = useUsdPrice(249);

  if (!isOpen) return null;

  const handleUnlock = async (isTestMode = false) => {
    setLoading(true);
    setError(null);

    try {
      if (isTestMode) {
        // Fast test unlock for local development
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: `order_mock_${Date.now()}`,
            paymentId: `pay_mock_${Date.now()}`,
            signature: "mock_signature",
            reportId,
          }),
        });

        if (!verifyRes.ok) throw new Error("Verification failed");
        onSuccess();
        onClose();
        return;
      }

      // 1. Create order with selected currency
      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, currency }),
      });

      if (!orderRes.ok) throw new Error("Could not initialize order");
      const orderData = await orderRes.json();

      // If Dodo Payments checkout session was created, redirect directly
      if (orderData.provider === "dodo" && orderData.checkoutUrl) {
        window.location.href = orderData.checkoutUrl;
        return;
      }

      // Check if Razorpay script is loaded in window
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "ProfileGlow",
          description: "AI Dating Coach Unlock",
          order_id: orderData.orderId,
          handler: async function (response: any) {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                reportId,
              }),
            });
            if (verifyRes.ok) {
              onSuccess();
              onClose();
            }
          },
          theme: {
            color: "#7c5cff",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // If script isn't loaded, activate test unlock
        await handleUnlock(true);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Payment process could not be completed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
      <div className="card-brutal p-8 bg-card max-w-md w-full relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink font-black hover:text-orange"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <Badge variant="lime">COACHING CHAT ACCESS</Badge>
          <h2 className="text-3xl font-black text-ink tracking-tight mt-1">
            Level up your conversations.
          </h2>
          <div className="my-3 flex items-baseline justify-center gap-2">
            <span className="text-4xl font-black text-purple tracking-tight">₹249</span>
            <span className="text-base font-bold text-ink tracking-normal">
              (~${usdEquivalent} USD)
            </span>
          </div>
          <p className="text-xs font-medium text-muted">
            Permanent unlock for this profile report. One-time payment, not a subscription.
          </p>

          {/* Currency Selector Toggle */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="text-[11px] font-bold text-muted flex items-center gap-1">
              <Globe className="w-3 h-3" /> Currency:
            </span>
            <div className="inline-flex rounded-lg border border-line p-0.5 bg-bg">
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`px-2.5 py-1 text-xs font-black rounded-md transition-all ${
                  currency === "INR"
                    ? "bg-purple text-white shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                ₹ INR (₹249)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-2.5 py-1 text-xs font-black rounded-md transition-all ${
                  currency === "USD"
                    ? "bg-purple text-white shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                $ USD (~${usdEquivalent})
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-pink border border-ink rounded-xl text-xs font-black text-ink flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-ink shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <ul className="space-y-2.5 text-xs font-bold text-ink mb-6 bg-bg p-4 rounded-xl border border-line">
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-ink stroke-[3] shrink-0" />
            <span>30 deep coaching messages</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-ink stroke-[3] shrink-0" />
            <span>Get specific opening lines for your matches</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-ink stroke-[3] shrink-0" />
            <span>Tailor your bio for specific hobbies and niches</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-ink stroke-[3] shrink-0" />
            <span>Accepts UPI, RuPay, Indian & International Cards, Apple Pay</span>
          </li>
        </ul>

        <div className="space-y-3">
          <Button
            type="button"
            variant="purple"
            size="lg"
            onClick={() => handleUnlock(false)}
            disabled={loading}
            className="w-full text-sm py-3"
          >
            {loading
              ? "Connecting to Checkout..."
              : currency === "USD"
              ? `Pay ~$${usdEquivalent} USD via Dodo Payments →`
              : `Pay ₹249 (~$${usdEquivalent} USD) via Dodo Payments →`}
          </Button>

          <button
            type="button"
            onClick={() => handleUnlock(true)}
            className="w-full text-center text-[11px] font-bold text-muted hover:text-purple transition-colors underline pt-1"
          >
            Quick Unlock (Developer Test Mode)
          </button>
        </div>
      </div>
    </div>
  );
};

