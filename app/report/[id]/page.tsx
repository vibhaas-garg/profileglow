"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ProfileReport } from "@/lib/types";
import { ScoreOverview } from "@/components/report/ScoreOverview";
import { PhotoRankings } from "@/components/report/PhotoRankings";
import { BioVariations } from "@/components/report/BioVariations";
import { PromptRewrites } from "@/components/report/PromptRewrites";
import { OpenersList } from "@/components/report/OpenersList";
import { RedFlagAudit } from "@/components/report/RedFlagAudit";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { PaywallModal } from "@/components/chat/PaywallModal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AlertCircle, Loader2, Sparkles, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useUsdPrice } from "@/lib/useCurrency";

function ReportContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const reportId = params.id as string;

  const [report, setReport] = useState<ProfileReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const { usdEquivalent } = useUsdPrice(249);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // If returning from successful payment redirect
        const isPaidRedirect =
          searchParams.get("payment") === "success" ||
          searchParams.get("unlocked") === "true" ||
          searchParams.get("status") === "succeeded";

        if (isPaidRedirect && reportId) {
          const paymentId = searchParams.get("payment_id") || `dodo_${Date.now()}`;
          try {
            await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: "dodo_checkout",
                paymentId,
                reportId,
              }),
            });
          } catch (e) {
            console.warn("Auto unlock verification error:", e);
          }
        }

        const res = await fetch(`/api/reports/${reportId}`);
        if (!res.ok) {
          // Check local storage backup before giving up
          if (typeof window !== "undefined") {
            const cached =
              localStorage.getItem(`profileglow_report_data_${reportId}`) ||
              localStorage.getItem("profileglow_latest_report_data");
            if (cached) {
              try {
                const cachedData = JSON.parse(cached);
                setReport(cachedData);
                setLoading(false);
                return;
              } catch (e) {
                // ignore
              }
            }
          }
          throw new Error("Could not find report.");
        }
        const data = await res.json();
        setReport(data);

        // Store latest report locally so returning users can jump straight back to it
        if (typeof window !== "undefined") {
          localStorage.setItem("profileglow_latest_report", reportId);
          localStorage.setItem(`profileglow_report_data_${reportId}`, JSON.stringify(data));
          localStorage.setItem("profileglow_latest_report_data", JSON.stringify(data));
        }

        trackEvent("report_viewed", {
          report_id: reportId,
          score: data.overallScore,
          app: data.inputData?.app || "unknown",
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load report.");
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchReport();
    }
  }, [reportId, searchParams]);

  const handleShare = async () => {
    if (!report) return;

    trackEvent("report_shared", {
      report_id: report.id,
      overall_score: report.overallScore,
      app: report.inputData.app,
    });

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${report.inputData.app.toUpperCase()} Profile Score: ${report.overallScore}/10 | ProfileGlow`,
          text: `Check out my ProfileGlow dating profile makeover report: "${report.headlineVerdict}"`,
          url: window.location.href,
        });
        return;
      } catch (err: any) {
        if (err.name === "AbortError") return;
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToCoach = () => {
    const el = document.getElementById("coaching-chat");
    if (el) {
      const rect = el.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + rect.top - 72,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        <div className="card-brutal p-8 bg-card text-center space-y-3 max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-purple border-2 border-ink flex items-center justify-center mx-auto shadow-brutal-sm">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
          <h2 className="text-xl font-black text-ink">Loading Your Makeover Report...</h2>
          <p className="text-xs font-medium text-muted">
            Fetching photo critiques, bio rewrites, and conversation hooks.
          </p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        <div className="card-brutal p-8 bg-card text-center space-y-4 max-w-md">
          <div className="w-12 h-12 rounded-2xl bg-pink border-2 border-ink flex items-center justify-center mx-auto shadow-brutal-sm">
            <AlertCircle className="w-6 h-6 text-ink" />
          </div>
          <h2 className="text-2xl font-black text-ink">Report Not Found</h2>
          <p className="text-sm font-medium text-muted">
            We couldn&apos;t locate this makeover report. It may have expired or was created in a different session.
          </p>
          <Link
            href="/dashboard?new=true"
            className="btn-brutal bg-purple text-white px-6 py-2.5 text-xs rounded-xl inline-block"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="border-b border-line bg-card sticky top-0 z-40 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-black text-lg tracking-tighter text-ink mr-1">
              Profile<span className="text-purple">Glow</span>
            </Link>
            <span className="text-line hidden sm:inline">|</span>
            <Link
              href="/dashboard?new=true"
              className="text-xs font-bold text-muted hover:text-ink hidden sm:inline"
            >
              + New Audit
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {!report.isChatUnlocked ? (
              <button
                onClick={() => setShowPaywall(true)}
                className="pill-brutal bg-purple text-white text-xs py-1 px-3.5 hover:bg-purple/90 font-black flex items-center gap-1.5 shadow-brutal-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-lime" />
                <span>Unlock Coach (₹249)</span>
              </button>
            ) : (
              <button
                onClick={scrollToCoach}
                className="pill-brutal bg-purple text-white text-xs py-1 px-3 hover:bg-purple/90 cursor-pointer"
              >
                Ask Coach ↓
              </button>
            )}

            <Badge variant="lime">
              Score: {report.overallScore}/10
            </Badge>

            <button
              onClick={handleShare}
              className={`pill-brutal text-xs py-1 px-3 transition-all cursor-pointer ${
                copied
                  ? "bg-lime text-ink border-ink"
                  : "bg-card text-ink hover:bg-bg"
              }`}
              title="Share this report or copy link"
            >
              {copied ? "Link Copied ✓" : "Share ↗"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        {/* Top High-Converting Coach Nudge Banner */}
        {!report.isChatUnlocked && (
          <div className="card-brutal p-5 sm:p-6 bg-gradient-to-r from-lime/30 via-card to-pink/20 border-2 border-ink shadow-brutal flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple text-white border-2 border-ink flex items-center justify-center shrink-0 shadow-brutal-xs">
                <Sparkles className="w-6 h-6 text-lime stroke-[2.25]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="lime">FREE AUDIT COMPLETE</Badge>
                  <span className="text-xs font-black text-ink">
                    Overall Score: {report.overallScore}/10 ({report.inputData.app.toUpperCase()})
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-ink tracking-tight">
                  Ready to turn these fixes into dates? Unlock your personal AI Dating Coach.
                </h3>
                <p className="text-xs sm:text-sm font-medium text-ink/80">
                  Get 30 tailored answers, custom openers for specific matches, and new photo reviews for just{" "}
                  <span className="font-black text-purple">₹249 (~${usdEquivalent} USD)</span>. Instant activation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
              <Button
                variant="purple"
                size="md"
                onClick={() => setShowPaywall(true)}
                className="w-full sm:w-auto px-6 py-3 font-black shadow-brutal"
              >
                Unlock AI Coach (₹249) →
              </Button>
            </div>
          </div>
        )}

        {/* Score & Verdict Overview */}
        <ScoreOverview
          overallScore={report.overallScore}
          subScores={report.subScores}
          headlineVerdict={report.headlineVerdict}
          verdictSummary={report.verdictSummary}
          app={report.inputData.app}
        />

        {/* Photo Strategy */}
        <PhotoRankings
          photos={report.inputData.photoUrls}
          critiques={report.photoCritiques}
        />

        {/* Mid-Report Coach Nudge Banner */}
        {!report.isChatUnlocked && (
          <div className="card-brutal p-5 bg-card border-2 border-dashed border-purple rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-brutal-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lime border-2 border-ink flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-ink stroke-[2.25]" />
              </div>
              <div>
                <p className="text-xs font-black text-purple uppercase tracking-wider">
                  Stuck on how to reply to someone specific?
                </p>
                <p className="text-xs font-semibold text-ink/90 mt-0.5">
                  Paste any match&apos;s photo or prompt into the AI Coach to get custom witty replies tailored to your profile.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPaywall(true)}
              className="pill-brutal bg-purple text-white text-xs py-2 px-4 font-black hover:bg-purple/90 shrink-0 cursor-pointer shadow-brutal-xs"
            >
              Get Match Openers (₹249) →
            </button>
          </div>
        )}

        {/* Bio Variations */}
        <BioVariations bios={report.bioRewrites} />

        {/* Two-Column Grid: Prompts & Openers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PromptRewrites prompts={report.promptRewrites} />
          <OpenersList openers={report.conversationOpeners} />
        </div>

        {/* Red Flag Audit */}
        <RedFlagAudit redFlags={report.redFlags} />

        {/* AI Coaching Chat Panel */}
        <div id="coaching-chat" className="pt-2 scroll-mt-20 pb-20">
          <ChatPanel
            reportId={report.id}
            report={report}
            isUnlocked={report.isChatUnlocked}
            onUnlocked={() => {
              setReport({ ...report, isChatUnlocked: true });
            }}
            initialMessageCount={report.chatMessageCount || 0}
          />
        </div>
      </main>

      {/* Sticky Bottom Nudge Bar on Mobile/Desktop when Locked */}
      {!report.isChatUnlocked && (
        <aside aria-label="Unlock AI Coach" className="fixed bottom-3 inset-x-3 max-w-xl mx-auto z-40">
          <div className="card-brutal p-3 bg-card border-2 border-ink shadow-brutal flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-lime border border-ink animate-pulse shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-black text-ink truncate">
                  Personal AI Dating Coach
                </p>
                <p className="text-[10px] text-muted truncate">
                  30 questions • Custom replies • Photo reviews
                </p>
              </div>
            </div>
            <Button
              variant="purple"
              size="sm"
              onClick={() => setShowPaywall(true)}
              className="text-xs px-4 py-2 shrink-0 shadow-brutal-xs font-black"
            >
              Unlock: ₹249 (~${usdEquivalent})
            </Button>
          </div>
        </aside>
      )}

      {/* Global Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        reportId={report.id}
        onSuccess={() => {
          setReport({ ...report, isChatUnlocked: true });
          setShowPaywall(false);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-line py-6 text-center text-xs font-bold text-muted bg-card">
        ProfileGlow © {new Date().getFullYear()} • Powered by ProfileGlow Vision AI
      </footer>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
          <div className="card-brutal p-8 bg-card text-center space-y-3 max-w-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple border-2 border-ink flex items-center justify-center mx-auto shadow-brutal-sm">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
            <h2 className="text-xl font-black text-ink">Loading Your Makeover Report...</h2>
          </div>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
