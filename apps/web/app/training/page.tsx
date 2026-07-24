"use client";

import Link from "next/link";
import { Loader2, RotateCcw } from "lucide-react";
import { useQuiz } from "@/src/hooks/useQuiz";
import { useTranslation } from "@/src/hooks/useTranslation";
import { Header } from "@/src/app/components/Header";
import { QuizCard } from "@/src/app/components/QuizCard";
import { Button } from "@/src/app/components/Button";
import { LanguageSwitcher } from "@/src/app/components/LanguageSwitcher";
import { ExitButton } from "@/src/app/components/ExitButton";

export default function TrainingPage() {
  const {
    status,
    language,
    currentQuestion,
    currentIndex,
    total,
    score,
    selectedAnswerId,
    result,
    changeLanguage,
    answer,
    next,
    restart,
    quit,
  } = useQuiz();
  const t = useTranslation(language);

  if (status === "loading") {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950 text-white">
        <ExitButton
          label={t("quit")}
          onBeforeLeave={quit}
          className="absolute top-4 left-4"
        />
        <Loader2 className="animate-spin" size={32} />
        <p className="text-slate-300">{t("loadingQuestions")}</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950 text-white">
        <ExitButton
          label={t("quit")}
          onBeforeLeave={quit}
          className="absolute top-4 left-4"
        />
        <p className="text-slate-300">{t("loadFailed")}</p>
        <Button onClick={restart}>
          <RotateCcw size={20} />
          {t("retry")}
        </Button>
      </main>
    );
  }

  if (status === "finished") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-950 text-white text-center px-4">
        <h1 className="text-4xl font-bold">{t("quizFinished")}</h1>
        <p className="text-2xl text-slate-300">
          {t("finalScore")} : <span className="text-blue-400">{score}</span> /{" "}
          {total}
        </p>
        <div className="flex gap-4">
          <Button onClick={restart}>
            <RotateCcw size={20} />
            {t("replay")}
          </Button>
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-xl bg-slate-800 px-6 py-4 text-lg font-medium transition hover:bg-slate-700"
          >
            {t("backHome")}
          </Link>
        </div>
      </main>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4 py-10">
      <ExitButton
        label={t("quit")}
        onBeforeLeave={quit}
        className="absolute top-4 left-4"
      />
      <LanguageSwitcher
        value={language}
        onChange={changeLanguage}
        className="absolute top-4 right-4"
      />
      <Header
        current={currentIndex}
        total={total}
        score={score}
        language={language}
      />

      <QuizCard
        question={currentQuestion}
        selectedAnswerId={selectedAnswerId}
        result={result}
        language={language}
        onSelect={(answerId) => void answer(answerId)}
      />

      {selectedAnswerId !== null && (
        <div className="w-full max-w-xl mx-auto mt-6 flex justify-end">
          <Button onClick={next}>
            {currentIndex + 1 >= total ? t("seeResult") : t("nextQuestion")}
          </Button>
        </div>
      )}
    </main>
  );
}
