"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { SuggestionChips } from "@/components/chat/SuggestionChips";
import { PaywallModal } from "@/components/chat/PaywallModal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Loader2, MessageSquare, Camera, X, RotateCcw } from "lucide-react";
import { useUsdPrice } from "@/lib/useCurrency";
import { ProfileReport } from "@/lib/types";

interface ChatPanelProps {
  reportId: string;
  report?: ProfileReport | null;
  isUnlocked: boolean;
  onUnlocked: () => void;
  initialMessageCount?: number;
}

// Client-side image compressor for instant chat photo analysis
async function compressChatImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = (err) => reject(err);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve(e.target?.result as string);
      img.onload = () => {
        const maxWidth = 1000;
        const maxHeight = 1000;
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  reportId,
  report,
  isUnlocked,
  onUnlocked,
  initialMessageCount = 0,
}) => {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string; image?: string }>
  >([
    {
      role: "assistant",
      content:
        "**Welcome to your AI Coaching Session!**\n\nI have analyzed your profile report and photo scores. What would you like to tackle first?\n\n- **Craft Match Openers:** Ask me for a witty first message for a specific Hinge prompt or Bumble bio.\n- **Photo Critique:** Attach a selfie or outfit photo using the camera button to get an instant rating and actionable tips.\n- **Bio Customization:** Ask me to rewrite your bio in a witty, bold, or authentic style for your city.",
    },
  ]);
  const [input, setInput] = useState("");
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [processingImage, setProcessingImage] = useState(false);
  const [sending, setSending] = useState(false);
  const [quotaCount, setQuotaCount] = useState(initialMessageCount);
  const [showPaywall, setShowPaywall] = useState(false);
  const { usdEquivalent } = useUsdPrice(249);

  // Restore chat messages from localStorage if present
  useEffect(() => {
    if (typeof window !== "undefined" && reportId) {
      const saved = localStorage.getItem(`profileglow_chat_${reportId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }, [reportId]);

  // Save chat messages to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined" && reportId && messages.length > 1) {
      try {
        localStorage.setItem(`profileglow_chat_${reportId}`, JSON.stringify(messages));
      } catch (e) {
        // ignore
      }
    }
  }, [messages, reportId]);

  const messageListRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Scroll ONLY internal container so outer window never jumps
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sending]);

  const handleInputFocus = () => {
    if (panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      if (rect.top < 50 || rect.top > 110) {
        window.scrollTo({
          top: window.scrollY + rect.top - 72,
          behavior: "smooth",
        });
      }
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcessingImage(true);
    try {
      const compressed = await compressChatImage(file);
      setAttachedImage(compressed);
    } catch (err) {
      console.error("Failed to process photo:", err);
    } finally {
      setProcessingImage(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  const handleSend = async (messageText?: string) => {
    const rawText = messageText || input;
    const textToSend = rawText.trim() || (attachedImage ? "Review this photo for my dating profile. How does it look?" : "");

    if (!textToSend && !attachedImage) return;
    if (sending) return;

    if (!isUnlocked) {
      setShowPaywall(true);
      return;
    }

    const currentImage = attachedImage;
    setInput("");
    setAttachedImage(null);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: textToSend,
        ...(currentImage ? { image: currentImage } : {}),
      },
    ]);
    setSending(true);

    try {
      const reportContext = report
        ? {
            app: report.inputData?.app,
            age: report.inputData?.age,
            location: report.inputData?.location,
            genderPreference: report.inputData?.genderPreference,
            relationshipGoal: report.inputData?.relationshipGoal,
            bio: report.inputData?.bio,
            overallScore: report.overallScore,
            verdictSummary: report.verdictSummary,
            bioRewrites: report.bioRewrites,
            isChatUnlocked: isUnlocked || report.isChatUnlocked,
          }
        : undefined;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId,
          message: textToSend,
          image: currentImage,
          reportContext,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (errorData.requiresPayment) {
          setShowPaywall(true);
          return;
        }
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      if (data.quotaUsed !== undefined) {
        setQuotaCount(data.quotaUsed);
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `**Actionable Tip**\n\nI hit a quick network hiccup while analyzing that. Please click **Send** again and I'll jump right in with your custom profile advice!`,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleResetQuota = async () => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId,
          action: "reset_quota",
        }),
      });
      if (res.ok) {
        setQuotaCount(0);
      }
    } catch (e) {
      console.error("Reset quota error:", e);
    }
  };

  const remainingQuestions = Math.max(0, 30 - quotaCount);

  return (
    <div
      ref={panelRef}
      className="card-brutal p-4 md:p-6 bg-card flex flex-col h-[calc(100vh-5.5rem)] min-h-[460px] max-h-[660px] relative transition-all"
    >
      {/* Chat Header */}
      <div className="flex justify-between items-center border-b border-line pb-3 mb-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lime border border-ink animate-pulse" />
            <h2 className="text-lg md:text-xl font-black text-ink tracking-tight">
              Dating Coach Chat
            </h2>
          </div>
          <p className="text-[11px] md:text-xs text-muted font-medium mt-0.5">
            Grounded in your profile report & photo critique
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isUnlocked ? (
            remainingQuestions > 0 ? (
              <Badge variant="lime">
                {remainingQuestions} / 30 questions left
              </Badge>
            ) : (
              <Badge variant="pink">0 / 30 questions left</Badge>
            )
          ) : (
            <Badge variant="pink">Locked</Badge>
          )}

          {isUnlocked && remainingQuestions === 0 && (
            <button
              onClick={handleResetQuota}
              className="text-[11px] font-bold text-purple hover:underline flex items-center gap-1 cursor-pointer"
              title="Reset quota for developer test"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Message List */}
      <div ref={messageListRef} className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-2.5">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} content={msg.content} image={msg.image} />
        ))}
        {sending && (
          <div className="flex justify-start mb-3">
            <div className="p-3 bg-bg border border-line rounded-xl text-xs font-bold text-muted flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple" />
              <span>Coach is analyzing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Locked Overlay if not unlocked */}
      {!isUnlocked && (
        <div className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6 top-16 bg-bg/95 backdrop-blur-sm rounded-xl border-2 border-dashed border-ink flex flex-col items-center justify-center p-6 text-center space-y-4 z-20">
          <div className="w-14 h-14 rounded-2xl bg-pink border-2 border-ink flex items-center justify-center shadow-brutal">
            <MessageSquare className="w-7 h-7 text-ink stroke-[2.25]" />
          </div>
          <div className="max-w-sm space-y-1">
            <h3 className="font-black text-lg md:text-xl text-ink tracking-tight">
              Unlock Your Personal Dating Coach
            </h3>
            <p className="text-xs font-medium text-muted">
              Get 30 tailored coaching turns with photo analysis, custom reply assistance, and bio polishing for ₹249 (~${usdEquivalent} USD).
            </p>
          </div>
          <Button
            type="button"
            variant="purple"
            size="md"
            onClick={() => setShowPaywall(true)}
            className="px-6 py-2.5"
          >
            Unlock Coaching Chat: ₹249 (~${usdEquivalent} USD)
          </Button>
        </div>
      )}

      {/* Bottom Input Area */}
      {isUnlocked && (
        <div className="border-t border-line pt-2.5 space-y-2 shrink-0">
          {remainingQuestions > 0 ? (
            <>
              <SuggestionChips onSelect={(text) => handleSend(text)} disabled={sending} />

              {/* Attached Image Thumbnail Preview */}
              {attachedImage && (
                <div className="flex items-center gap-2 p-2 bg-bg border-2 border-ink rounded-xl shadow-brutal-sm w-fit">
                  <div className="w-12 h-12 rounded-lg border border-ink overflow-hidden bg-card">
                    <img src={attachedImage} alt="Attached preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-ink">Photo attached</p>
                    <p className="text-[10px] text-muted">Ready for AI critique</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedImage(null)}
                    className="w-5 h-5 rounded-full bg-orange text-white flex items-center justify-center ml-2 border border-ink hover:opacity-90"
                    title="Remove photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                {/* Photo Upload Attachment Button */}
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={sending || processingImage}
                  className="p-2.5 rounded-xl border-2 border-ink bg-purple hover:bg-purple-dark text-white transition-all shadow-brutal flex items-center justify-center cursor-pointer shrink-0 disabled:opacity-50"
                  title="Attach a new photo to get feedback"
                >
                  {processingImage ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Camera className="w-4 h-4 text-white stroke-[2.25]" />
                  )}
                </button>

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  onChange={handleImageSelect}
                  className="hidden"
                />

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={handleInputFocus}
                  placeholder={
                    attachedImage
                      ? "Add a note or hit Send to analyze this photo..."
                      : "Ask your coach or attach a photo for feedback..."
                  }
                  disabled={sending}
                  className="flex-1 px-4 py-2.5 bg-bg border-2 border-ink rounded-xl text-xs md:text-sm font-medium text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-purple shadow-brutal-sm"
                />

                <Button
                  type="submit"
                  variant="purple"
                  size="md"
                  disabled={sending || (!input.trim() && !attachedImage)}
                  className="px-5 py-2.5 text-xs md:text-sm font-black shrink-0"
                >
                  Send →
                </Button>
              </form>
            </>
          ) : (
            /* Quota Exhausted Card */
            <div className="p-4 bg-bg border-2 border-ink rounded-xl shadow-brutal-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <h4 className="font-black text-sm text-ink">30 of 30 Questions Completed</h4>
                <p className="text-xs text-muted font-medium mt-0.5">
                  You have reached the 30-message coaching limit for this profile makeover.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="lime"
                  size="sm"
                  onClick={() => setShowPaywall(true)}
                  className="text-xs px-4"
                >
                  Top Up 30 Questions ($2 / ₹149)
                </Button>
                <button
                  type="button"
                  onClick={handleResetQuota}
                  className="pill-brutal bg-card text-ink text-xs py-1.5 px-3 hover:bg-bg cursor-pointer"
                >
                  Reset (Test Mode)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        reportId={reportId}
        onSuccess={() => {
          onUnlocked();
          setQuotaCount(0);
        }}
      />
    </div>
  );
};
