import React from "react";
import clsx from "clsx";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

function renderCleanContent(text: string, isUser: boolean) {
  if (isUser) {
    return <div className="whitespace-pre-wrap">{text}</div>;
  }

  // Remove em dashes and emojis to maintain clean aesthetic
  const sanitized = text
    .replace(/[\u2014\u2013]/g, "-")
    .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u27BF]/g, "");

  const lines = sanitized.split("\n");
  const elements: React.ReactNode[] = [];
  let currentQuote: string[] = [];

  const flushQuote = (key: string) => {
    if (currentQuote.length > 0) {
      const quoteText = currentQuote.join(" ").trim();
      elements.push(
        <div
          key={key}
          className="my-2 p-3 bg-bg border-2 border-ink rounded-xl font-bold text-ink text-xs md:text-sm shadow-brutal-sm"
        >
          {quoteText.startsWith('"') ? quoteText : `"${quoteText}"`}
        </div>
      );
      currentQuote = [];
    }
  };

  lines.forEach((rawLine, idx) => {
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushQuote(`q_flush_${idx}`);
      return;
    }

    // Header formats: ### Option 1: ... or ## Option: ...
    if (/^(#{1,6}\s*)/.test(trimmed)) {
      flushQuote(`q_h_${idx}`);
      const headerText = trimmed.replace(/^#{1,6}\s*/, "").replace(/\*\*/g, "");
      elements.push(
        <h4 key={`h_${idx}`} className="font-black text-xs md:text-sm text-ink mt-3 mb-1 uppercase tracking-wide">
          {headerText}
        </h4>
      );
      return;
    }

    // Blockquote formats: > "..."
    if (trimmed.startsWith(">")) {
      const quoteContent = trimmed
        .replace(/^>\s*/, "")
        .replace(/^["']|["']$/g, "")
        .replace(/\*\*/g, "");
      currentQuote.push(quoteContent);
      return;
    }

    flushQuote(`q_before_${idx}`);

    // Clean stray asterisks, hashes, and bullets
    const cleanLine = trimmed
      .replace(/^[\*\-•]\s*/, "") // remove leading bullets
      .replace(/\*\*/g, "");       // remove bold asterisks

    // "Why it works:" section
    if (/^why it works:/i.test(cleanLine)) {
      const rest = cleanLine.replace(/^why it works:\s*/i, "");
      elements.push(
        <div key={`wiw_${idx}`} className="text-xs text-muted font-medium mt-1 mb-2">
          <span className="font-black text-ink">Why it works: </span>
          <span>{rest}</span>
        </div>
      );
      return;
    }

    // "Coach Tip:" section
    if (/^coach tip:/i.test(cleanLine)) {
      const rest = cleanLine.replace(/^coach tip:\s*/i, "");
      elements.push(
        <div key={`tip_${idx}`} className="mt-2 p-2.5 bg-lime/30 border border-ink rounded-lg text-xs font-bold text-ink">
          <span className="font-black">Coach Tip: </span>
          <span>{rest}</span>
        </div>
      );
      return;
    }

    // "Option X:" without markdown header
    if (/^option\s*\d+:/i.test(cleanLine)) {
      elements.push(
        <h4 key={`opt_${idx}`} className="font-black text-xs md:text-sm text-ink mt-3 mb-1">
          {cleanLine}
        </h4>
      );
      return;
    }

    // Standard conversational paragraph
    elements.push(
      <p key={`p_${idx}`} className="text-xs md:text-sm text-ink font-medium leading-relaxed my-1">
        {cleanLine}
      </p>
    );
  });

  flushQuote("q_final");

  return <div className="space-y-1">{elements}</div>;
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
          "max-w-[88%] rounded-2xl p-4 text-xs md:text-sm font-medium border-2 border-ink shadow-brutal-sm leading-relaxed",
          isUser
            ? "bg-purple text-white rounded-br-none"
            : "bg-card text-ink rounded-bl-none"
        )}
      >
        {!isUser && (
          <div className="text-[10px] font-black uppercase text-purple tracking-wider mb-1.5 flex items-center gap-1.5 border-b border-line/60 pb-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple" />
            <span>AI Dating Coach</span>
          </div>
        )}
        {image && (
          <div className="mb-2.5 rounded-xl border-2 border-ink overflow-hidden max-w-[220px] shadow-sm bg-bg">
            <img src={image} alt="Uploaded attachment" className="w-full h-auto object-cover max-h-[220px]" />
          </div>
        )}
        {renderCleanContent(content, isUser)}
      </div>
    </div>
  );
};
