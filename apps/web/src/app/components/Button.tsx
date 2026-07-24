import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "success" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-blue-600 hover:bg-blue-500",
  secondary: "bg-slate-800 hover:bg-slate-700",
  success: "bg-emerald-600",
  danger: "bg-rose-600",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-3 rounded-xl px-6 py-4 text-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
