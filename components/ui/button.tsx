import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-500 hover:to-blue-400 shadow-lg shadow-purple-500/25":
              variant === "default",
            "border border-white/20 bg-transparent text-white hover:bg-white/5":
              variant === "outline",
            "bg-transparent text-white hover:bg-white/5": variant === "ghost",
            "bg-transparent text-purple-400 underline-offset-4 hover:underline":
              variant === "link",
          },
          {
            "h-11 px-6 py-2 text-sm": size === "default",
            "h-9 px-4 text-xs": size === "sm",
            "h-12 px-8 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
