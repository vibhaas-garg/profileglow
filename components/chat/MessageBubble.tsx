"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Sparkles, Check, Copy, Star, AlertCircle, Lightbulb } from "lucide-react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

// Interactive Copy Button for quotes / suggested openers
function CopyQuoteCard({ quote }: { quote: string }) {
  const [copied, setCopied] = useState(false);
  const cleanQuote = quote.replace(/^["'“”]|["'“”]$/g, "").trim();

  const handleCopy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(cleanQuote);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-2.5 p-3.5 bg-bg border-2 border-ink rounded-xl shadow-brutal-xs flex items-center justify-between gap-3 group">
      <p className="text-xs md:text-sm font-bold text-ink italic leading-relaxed">
        &ldquo;{cleanQuote}&rdquo;
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="pill-brutal bg-card hover:bg-lime text-ink text-[11px] font-black py-1 px-2.5 shrink-0 transition-all cursor-pointer flex items-center gap-1 shadow-brutal-xs"
        title="Copy message to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-ink stroke-[3]" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3 text-ink" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

// Parses inline markdown bold (**bold**) and italics (*italic*)
function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  // Match **bold** or *italic*
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return tokens.map((token, i) => {
    if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
      return (
        <strong key={i} className="font-black text-ink">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("*") && token.endsWith("*") && token.length > 2 && !token.startsWith("**")) {
      return (
        <em key={i} className="font-bold text-ink italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    return token;
  });
}

// Common standalone heading words
const STANDALONE_HEADINGS = new Set([
  "critique",
  "verdict",
  "overview",
  "key takeaways",
  "takeaways",
  "feedback",
  "diagnosis",
  "strengths",
  "red flags",
  "breakdown",
  "options",
  "suggested openers",
  "bio options",
  "first impressions",
  "recommendations",
  "action plan",
]);

function renderCleanContent(text: string, isUser: boolean) {
  if (isUser) {
    return <div className="whitespace-pre-wrap">{text}</div>;
  }

  // Normalize em dashes and clean weird artifacts
  const sanitized = text
    .replace(/[\u2014\u2013]/g, "-")
    .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u27BF]/g, "");

  const rawLines = sanitized.split("\n");
  const elements: React.ReactNode[] = [];

  let i = 0;
  while (i < rawLines.length) {
    const rawLine = rawLines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Rating / Score Line: e.g. "Dating App Photo Rating: 3.5 out of 10" or "**Photo Rating: 8/10**"
    const ratingMatch = trimmed.match(
      /^(?:\*\*)?(?:Dating App Photo Rating|Photo Rating|Profile Rating|Rating|Overall Score|Score):(?:\*\*)?\s*([0-9.]+(?:\s*(?:\/|out of)\s*10)?)/i
    );
    if (ratingMatch) {
      const scoreVal = ratingMatch[1];
      const title = trimmed.replace(/:.*/, "").replace(/\*\*/g, "").trim();
      elements.push(
        <div
          key={`rating_${i}`}
          className="my-3 p-3.5 bg-bg border-2 border-ink rounded-xl shadow-brutal-xs flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple" />
            <span className="text-xs md:text-sm font-black uppercase text-ink tracking-wider">
              {title}
            </span>
          </div>
          <span className="pill-brutal bg-lime text-ink font-black text-xs md:text-sm py-1 px-3 shadow-brutal-xs flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-ink text-ink" />
            <span>{scoreVal}</span>
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 2. Recommendation Line: e.g. "Recommendation: Discard / Retake" or "**Recommendation:** Lead Photo"
    const recMatch = trimmed.match(/^(?:\*\*)?Recommendation:(?:\*\*)?\s*(.+)$/i);
    if (recMatch) {
      const recValue = recMatch[1].replace(/\*\*/g, "").trim();
      const isDiscard = /discard|retake|avoid|remove/i.test(recValue);
      const isLead = /lead|primary|top/i.test(recValue);

      const badgeVariant = isDiscard
        ? "bg-pink text-ink border-ink"
        : isLead
        ? "bg-lime text-ink border-ink"
        : "bg-purple text-white border-ink";

      elements.push(
        <div
          key={`rec_${i}`}
          className="my-2.5 p-3 bg-card border-2 border-ink rounded-xl shadow-brutal-xs flex flex-wrap items-center justify-between gap-2"
        >
          <span className="text-xs font-black uppercase text-ink tracking-wider">
            Recommendation:
          </span>
          <span className={clsx("pill-brutal text-xs font-black py-0.5 px-3", badgeVariant)}>
            {recValue}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 3. Actionable Tip or Coach Tip (Standalone or inline)
    const isTipHeaderOnly = /^(?:\*\*)?(?:actionable tip|coach tip|pro tip|top tip)(?:\*\*)?:?$/i.test(trimmed);
    const tipInlineMatch = trimmed.match(/^(?:\*\*)?(?:actionable tip|coach tip|pro tip|top tip):(?:\*\*)?\s*(.+)$/i);

    if (isTipHeaderOnly || tipInlineMatch) {
      let tipBody = "";
      if (tipInlineMatch) {
        tipBody = tipInlineMatch[1];
      } else {
        // Collect following line(s) as the tip body
        i++;
        const tipLines: string[] = [];
        while (i < rawLines.length && rawLines[i].trim() && !rawLines[i].trim().endsWith(":")) {
          tipLines.push(rawLines[i].trim());
          i++;
        }
        tipBody = tipLines.join(" ");
        // decrement so outer loop handles next line correctly
        i--;
      }

      elements.push(
        <div
          key={`tip_${i}`}
          className="my-3.5 p-4 bg-lime/30 border-2 border-ink rounded-xl shadow-brutal-xs space-y-1.5"
        >
          <div className="flex items-center gap-1.5 text-xs font-black text-ink uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple fill-purple shrink-0" />
            <span>Actionable Tip</span>
          </div>
          <p className="text-xs md:text-sm text-ink font-semibold leading-relaxed pl-5">
            {renderInlineMarkdown(tipBody)}
          </p>
        </div>
      );
      i++;
      continue;
    }

    // 4. Standalone Header: e.g. "Critique", "Verdict", "### Option 1", "## Suggested Openers"
    const mdHeaderMatch = trimmed.match(/^(#{1,6})\s*(.+)$/);
    const isStandaloneWordHeader =
      STANDALONE_HEADINGS.has(trimmed.toLowerCase().replace(/\*\*/g, "")) && !trimmed.includes(":");

    if (mdHeaderMatch || isStandaloneWordHeader) {
      const headerText = mdHeaderMatch
        ? mdHeaderMatch[2].replace(/\*\*/g, "").trim()
        : trimmed.replace(/\*\*/g, "").trim();

      elements.push(
        <div
          key={`h_${i}`}
          className="pt-3 pb-1 border-b-2 border-ink/15 mb-2 mt-4 first:mt-0 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-purple shrink-0" />
          <h4 className="font-black text-xs md:text-sm text-ink uppercase tracking-wider">
            {headerText}
          </h4>
        </div>
      );
      i++;
      continue;
    }

    // 5. Quote Box: e.g. '"Honestly? I will let you decide..."' or '> "..."'
    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length > 5) ||
      trimmed.startsWith(">")
    ) {
      const quoteContent = trimmed.replace(/^>\s*/, "");
      elements.push(<CopyQuoteCard key={`quote_${i}`} quote={quoteContent} />);
      i++;
      continue;
    }

    // 6. Option X Header: e.g. "Option 1: The Witty Play" or "**Option 1: The Witty Play**"
    const optionMatch = trimmed.match(/^(?:\*\*)?(Option\s*\d+[^:]*):(?:\*\*)?\s*(.*)$/i);
    if (optionMatch) {
      const optTitle = optionMatch[1].replace(/\*\*/g, "").trim();
      const rest = optionMatch[2].trim();
      elements.push(
        <div key={`opt_${i}`} className="mt-3.5 mb-1.5">
          <h4 className="font-black text-xs md:text-sm text-purple uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple" />
            <span>{optTitle}</span>
          </h4>
          {rest && (
            <p className="text-xs md:text-sm text-ink font-medium leading-relaxed mt-1">
              {renderInlineMarkdown(rest)}
            </p>
          )}
        </div>
      );
      i++;
      continue;
    }

    // 7. Labeled Attribute Item with Colon:
    // e.g. "Lighting: The indoor light is flat..."
    // e.g. "Outfit: The neat black polo..."
    // e.g. "Eye Contact: You are looking..."
    // e.g. "Background Environment: The plain white wall..."
    // e.g. "Why it works: Direct and easy..."
    // e.g. "When to send: Within 2 hours..."
    // e.g. "- **Expression:** Your mouth is..."
    const labelMatch = trimmed.match(
      /^(?:[-*•]\s*)?(?:\*\*)?([A-Za-z0-9\s/&'-]{2,40}?):(?:\*\*)?\s*(.+)$/
    );

    if (labelMatch) {
      const label = labelMatch[1].replace(/\*\*/g, "").trim();
      const value = labelMatch[2].trim();

      // Special highlight for "Why it works" / "Why this works"
      if (/^why (?:it|this) works$/i.test(label)) {
        elements.push(
          <div
            key={`wiw_${i}`}
            className="my-2 p-2.5 bg-bg/80 border-l-4 border-purple rounded-r-xl text-xs md:text-sm text-ink font-medium"
          >
            <span className="font-black text-purple">Why it works: </span>
            <span>{renderInlineMarkdown(value)}</span>
          </div>
        );
        i++;
        continue;
      }

      elements.push(
        <div
          key={`label_${i}`}
          className="my-1.5 pl-2.5 border-l-2 border-purple/40 py-0.5 text-xs md:text-sm leading-relaxed"
        >
          <strong className="font-black text-ink tracking-tight">{label}: </strong>
          <span className="text-ink/90 font-medium">{renderInlineMarkdown(value)}</span>
        </div>
      );
      i++;
      continue;
    }

    // 8. Bullet Item: e.g. "- Natural daylight is best" or "• Add a conversational question"
    const bulletMatch = trimmed.match(/^[-*•]\s*(.+)$/);
    if (bulletMatch) {
      elements.push(
        <div key={`bullet_${i}`} className="my-1 pl-3 flex items-start gap-2 text-xs md:text-sm">
          <span className="text-purple font-black select-none mt-0.5">•</span>
          <span className="text-ink font-medium leading-relaxed">
            {renderInlineMarkdown(bulletMatch[1])}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 9. Standard Conversational Paragraph
    elements.push(
      <p
        key={`p_${i}`}
        className="text-xs md:text-sm text-ink font-medium leading-relaxed my-1.5"
      >
        {renderInlineMarkdown(trimmed)}
      </p>
    );
    i++;
  }

  return <div className="space-y-1.5">{elements}</div>;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content, image }) => {
  const isUser = role === "user";

  return (
    <div
      className={clsx(
        "flex w-full mb-3.5",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-[90%] md:max-w-[85%] rounded-2xl p-4 md:p-5 text-xs md:text-sm font-medium border-2 border-ink shadow-brutal-sm leading-relaxed transition-all",
          isUser
            ? "bg-purple text-white rounded-br-none"
            : "bg-card text-ink rounded-bl-none"
        )}
      >
        {!isUser && (
          <div className="text-[10px] font-black uppercase text-purple tracking-wider mb-2 flex items-center justify-between border-b border-line/70 pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-lime border border-ink animate-pulse" />
              <span className="text-ink font-black">AI Dating Coach</span>
            </div>
            <span className="text-[9px] font-bold text-muted lowercase hidden sm:inline">
              grounded in your profile
            </span>
          </div>
        )}

        {image && (
          <div className="mb-3 rounded-xl border-2 border-ink overflow-hidden max-w-[240px] shadow-sm bg-bg">
            <img
              src={image}
              alt="Uploaded attachment"
              className="w-full h-auto object-cover max-h-[240px]"
            />
          </div>
        )}

        {renderCleanContent(content, isUser)}
      </div>
    </div>
  );
};
