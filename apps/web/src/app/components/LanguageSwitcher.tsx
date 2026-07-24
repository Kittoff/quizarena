import type { Language } from "@/src/types/quiz";

interface LanguageSwitcherProps {
  value: Language | null;
  onChange: (language: Language) => void;
  className?: string;
}

const OPTIONS: { code: Language; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "ja", label: "JA" },
];

export function LanguageSwitcher({
  value,
  onChange,
  className = "",
}: LanguageSwitcherProps) {
  return (
    <div className={`inline-flex gap-1 rounded-xl bg-slate-800 p-1 ${className}`}>
      {OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => onChange(option.code)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            value === option.code
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
