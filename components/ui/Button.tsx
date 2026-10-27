import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "purple" | "lime" | "pink" | "alt" | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "purple",
  size = "md",
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    purple: "bg-purple text-white hover:bg-purple-dark",
    lime: "bg-lime text-ink hover:bg-lime-hover",
    pink: "bg-pink text-ink hover:bg-pink-hover",
    alt: "bg-card text-ink hover:bg-[#f0eee8]",
    dark: "bg-ink text-white hover:bg-[#2b2b2b]",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg shadow-brutal-sm",
    md: "px-5 py-2.5 text-sm rounded-xl shadow-brutal",
    lg: "px-7 py-3.5 text-base rounded-2xl shadow-brutal",
  };

  return (
    <button
      className={clsx(
        "btn-brutal inline-flex items-center justify-center gap-2 font-black transition-all",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
