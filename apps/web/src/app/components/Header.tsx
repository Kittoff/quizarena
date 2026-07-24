import { useTranslation } from "@/src/hooks/useTranslation";
import type { Language } from "@/src/types/quiz";

interface HeaderProps {
  current: number;
  total: number;
  score: number;
  language: Language;
}

export function Header({ current, total, score, language }: HeaderProps) {
  const t = useTranslation(language);
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <header className="w-full max-w-xl mx-auto mb-8">
      <div className="flex items-center justify-between text-sm text-slate-300 mb-2">
        <span>
          {t("questionOf", {
            current: Math.min(current + 1, total),
            total,
          })}
        </span>
        <span>
          {t("score")} : {score}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
