import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "featured" | "plain";
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-card border-2 border-ink shadow-brutal-lg rounded-2xl p-6",
    featured: "bg-pink border-2 border-ink shadow-brutal-xl rounded-2xl p-6",
    plain: "bg-card border border-line rounded-xl p-4",
  };

  return (
    <div className={clsx(variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
};
