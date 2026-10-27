import React from "react";

interface SuggestionChipsProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({ onSelect, disabled }) => {
  const suggestions = [
    "Give me 2 more funny Hinge prompt ideas",
    "How should I reply to someone who only wrote 'hey'?",
    "What kind of outdoor photo should I take this weekend?",
    "Help me make my bio shorter and punchier",
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-nowrap shrink-0">
      {suggestions.map((suggestion, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(suggestion)}
          disabled={disabled}
          className="text-[11px] font-bold px-3 py-1 rounded-full bg-card border border-ink text-ink hover:bg-lime hover:border-ink shadow-brutal-sm transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};
