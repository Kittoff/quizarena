"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface ExitButtonProps {
  label: string;
  confirmMessage?: string;
  onBeforeLeave?: () => void;
  className?: string;
}

export function ExitButton({
  label,
  confirmMessage,
  onBeforeLeave,
  className = "",
}: ExitButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (confirmMessage && !window.confirm(confirmMessage)) return;
        onBeforeLeave?.();
        router.push("/");
      }}
      className={`inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white ${className}`}
    >
      <X size={16} />
      {label}
    </button>
  );
}
