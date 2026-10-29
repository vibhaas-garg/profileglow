"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Sparkles, Check, Copy, Star } from "lucide-react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

// Parses inline markdown: **bold** and *italic*
function renderInline(text: string): React.ReactNode {
  if (!text) return null;
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
        <em key={i} className="font-semibold italic text-ink">
          {token.slice(1, -1)}
        </em>
      );
    }
    return token;
  });
}

function CopyableQuote({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const clean = text.replace(/^["'“”]|["'“”]$/g, "").trim();

  const handleCopy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(clean);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-2 p-3 bg-bg/80 border border-ink/30 rounded-xl flex items-center justify-between gap-3 group">
      <p className="text-xs md:text-sm font-semibold italic text-ink leading-relaxed">
        &ldquo;{clean}&rdquo;
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="pill-brutal bg-card hover:bg-lime text-ink text-[10px] font-black py-0.5 px-2 shrink-0 transition-all cursor-pointer flex items-center gap-1 shadow-xs"
        title="Copy message"
      >
        {copied ? (
          <>
            <Check className="w-2.5 h-2.5 text-ink stroke-[3]" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-2.5 h-2.5 text-ink" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

function renderMarkdownBody(content: string, isUser: boolean) {
  if (isUser) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  // Normalize lines
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const nodes: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const trimmed = raw.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Rating Pill: "Dating App Photo Rating: 7.5 out of 10" or "**Rating: 8/10**"
    const ratingMatch = trimmed.match(
      /^(?:\*\*)?(?:Dating App Photo Rating|Photo Rating|Rating|Score):(?:\*\*)?\s*([0-9.]+(?:\s*(?:\/|out of)\s*10)?)/i
    );
    if (ratingMatch) {
      const scoreVal = ratingMatch[1];
      nodes.push(
        <div key={`rating_${i}`} className="my-2 flex items-center gap-2">
          <span className="pill-brutal bg-lime text-ink font-black text-xs py-1 px-3 flex items-center gap-1.5 shadow-brutal-xs">
            <Star className="w-3.5 h-3.5 fill-ink text-ink" />
            <span>Rating: {scoreVal}</span>
          </span>
        </div>
      );
      i++;
      continue;
    }

    // 2. Actionable Tip Header & Callout Box
    const isTipStart = /^(?:\*\*)?(?:actionable tip|coach tip|pro tip):?(?:\*\*)?/i.test(trimmed);
    if (isTipStart) {
      let tipBody = trimmed.replace(/^(?:\*\*)?(?:actionable tip|coach tip|pro tip):?(?:\*\*)?\s*/i, "").trim();
      if (!tipBody && i + 1 < lines.length && lines[i + 1].trim()) {
        i++;
        tipBody = lines[i].trim();
      }
      nodes.push(
        <div key={`tip_${i}`} className="my-3 p-3.5 bg-lime/20 border border-ink/40 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-ink uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-purple fill-purple shrink-0" />
            <span>Actionable Tip</span>
          </div>
          <p className="text-xs md:text-sm text-ink/90 font-medium leading-relaxed">
            {renderInline(tipBody)}
          </p>
        </div>
      );
      i++;
      continue;
    }

    // 3. Headings: ###, ####, ##, #
    const hMatch = trimmed.match(/^(#{1,6})\s*(.+)$/);
    if (hMatch) {
      const level = hMatch[1].length;
      const hText = hMatch[2].replace(/\*\*/g, "").trim();
      if (level <= 2) {
        nodes.push(
          <h2 key={`h_${i}`} className="font-black text-sm md:text-base text-ink mt-3.5 mb-1.5 tracking-tight border-b border-line/60 pb-1">
            {hText}
          </h2>
        );
      } else if (level === 3) {
        nodes.push(
          <h3 key={`h_${i}`} className="font-black text-xs md:text-sm text-ink mt-3 mb-1 uppercase tracking-wider">
            {hText}
          </h3>
        );
      } else {
        nodes.push(
          <h4 key={`h_${i}`} className="font-bold text-xs md:text-sm text-purple mt-2.5 mb-1">
            {hText}
          </h4>
        );
      }
      i++;
      continue;
    }

    // 4. Blockquotes / Copyable Quotes: > "..." or starting with quote
    if (trimmed.startsWith(">") || (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length > 10)) {
      const quoteText = trimmed.replace(/^>\s*/, "");
      nodes.push(<CopyableQuote key={`q_${i}`} text={quoteText} />);
      i++;
      continue;
    }

    // 5. Unordered List Items: * item or - item or • item
    if (/^[-*•]\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[-*•]\s+/, ""));
        i++;
      }
      nodes.push(
        <ul key={`ul_${i}`} className="list-disc pl-5 my-2 space-y-1.5 text-xs md:text-sm text-ink/90">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 6. Ordered List Items: 1. item
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      nodes.push(
        <ol key={`ol_${i}`} className="list-decimal pl-5 my-2 space-y-1.5 text-xs md:text-sm text-ink/90">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 7. Standard Paragraph
    nodes.push(
      <p key={`p_${i}`} className="text-xs md:text-sm text-ink/90 font-normal leading-relaxed my-2">
        {renderInline(trimmed)}
      </p>
    );
    i++;
  }

  return <div className="space-y-1">{nodes}</div>;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content, image }) => {
  const isUser = role === "user";

  return (
    <div
      className={clsx(
        "flex w-full mb-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-[92%] md:max-w-[85%] rounded-2xl p-4 md:p-5 text-xs md:text-sm font-normal border-2 border-ink shadow-brutal-sm leading-relaxed transition-all",
          isUser
            ? "bg-purple text-white rounded-br-none"
            : "bg-card text-ink rounded-bl-none"
        )}
      >
        {!isUser && (
          <div className="text-[10px] font-black uppercase text-purple tracking-wider mb-2.5 flex items-center justify-between border-b border-line/60 pb-1.5">
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

        {renderMarkdownBody(content, isUser)}
      </div>
    </div>
  );
};
