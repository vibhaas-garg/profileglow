import React from "react";
import clsx from "clsx";

interface BadgeProps {
  variant?: "lime" | "pink" | "purple" | "white" | "orange";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "lime",
  children,
  className,
}) => {
  const variantStyles = {
    lime: "bg-lime text-ink border-ink",
    pink: "bg-pink text-ink border-ink",
    purple: "bg-purple text-white border-ink",
    white: "bg-card text-ink border-ink",
    orange: "bg-orange text-white border-ink",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-[1.5px] font-black text-xs uppercase tracking-wider shadow-brutal-sm",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
