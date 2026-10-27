import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  id,
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-black uppercase tracking-wider text-ink"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          "w-full px-3.5 py-2.5 bg-card border-[1.5px] border-ink rounded-xl text-sm font-medium text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-purple shadow-brutal-sm transition-all",
          error && "border-orange",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs font-bold text-orange">{error}</p>}
    </div>
  );
};
