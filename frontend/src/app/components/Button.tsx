import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/20",
    outline: "border border-border text-foreground hover:bg-card hover:shadow-lg",
  };

  return (
    <button
      className={cn(
        "px-6 py-3 rounded-xl font-medium transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
