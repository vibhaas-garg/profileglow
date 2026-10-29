"use client";

import React, { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/Badge";
import { AlertCircle, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function ReportPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const reportId = params.id as string;

  const [report, setReport] = useState<ProfileReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
          throw new Error("Could not find report.");
        }
        const data = await res.json();
        setReport(data);
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
            We couldn't locate this makeover report. It may have expired or was created in a different session.
          </p>
          <Link
            href="/dashboard"
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
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-xs font-black text-purple hover:underline">
              ← Dashboard
            </Link>
            <span className="text-line">|</span>
            <span className="font-black text-sm text-ink hidden sm:inline">
              Makeover Report #{report.id.substring(0, 8)}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                const el = document.getElementById("coaching-chat");
                if (el) {
                  const rect = el.getBoundingClientRect();
                  window.scrollTo({
                    top: window.scrollY + rect.top - 72,
                    behavior: "smooth",
                  });
                }
              }}
              className="pill-brutal bg-purple text-white text-xs py-1 px-3 hover:bg-purple/90"
            >
              Ask Coach ↓
            </button>
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
            isUnlocked={report.isChatUnlocked}
            onUnlocked={() => {
              setReport({ ...report, isChatUnlocked: true });
            }}
            initialMessageCount={report.chatMessageCount || 0}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-line py-6 text-center text-xs font-bold text-muted bg-card">
        ProfileGlow © {new Date().getFullYear()} • Built with Gemini 3.5 Flash Multimodal AI
      </footer>
    </div>
  );
}
