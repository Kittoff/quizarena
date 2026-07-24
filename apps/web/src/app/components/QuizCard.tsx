"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useTranslation } from "@/src/hooks/useTranslation";
import type { AnswerCheckResult, Language, Question } from "@/src/types/quiz";
import { Button } from "./Button";

interface QuizCardProps {
  question: Question;
  selectedAnswerId: number | null;
  result: AnswerCheckResult | null;
  language: Language;
  onSelect: (answerId: number) => void;
}

export function QuizCard({
  question,
  selectedAnswerId,
  result,
  language,
  onSelect,
}: QuizCardProps) {
  const t = useTranslation(language);
  const isAnswered = selectedAnswerId !== null;

  function variantForAnswer(answerId: number) {
    if (!isAnswered || !result) return "secondary" as const;
    if (result.correctAnswerId === answerId) return "success" as const;
    if (answerId === selectedAnswerId) return "danger" as const;
    return "secondary" as const;
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto rounded-2xl bg-slate-900 p-8"
    >
      <span className="text-xs uppercase tracking-wide text-blue-400">
        {question.category} · {t("difficulty")} {question.difficulty}
      </span>
      <h2 className="text-2xl font-semibold mt-2 mb-6">{question.text}</h2>

      <div className="flex flex-col gap-3">
        {question.answers.map((answer) => {
          const variant = variantForAnswer(answer.id);
          return (
            <Button
              key={answer.id}
              variant={variant}
              disabled={isAnswered}
              onClick={() => onSelect(answer.id)}
              className="w-full justify-between text-left"
            >
              <span>{answer.text}</span>
              {isAnswered && variant === "success" && <Check size={20} />}
              {isAnswered && variant === "danger" && <X size={20} />}
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
}
