"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Swords } from "lucide-react";
import { useDuel } from "@/src/hooks/useDuel";
import { useTranslation } from "@/src/hooks/useTranslation";
import { QuizCard } from "@/src/app/components/QuizCard";
import { Button } from "@/src/app/components/Button";
import { LanguageSwitcher } from "@/src/app/components/LanguageSwitcher";
import { ExitButton } from "@/src/app/components/ExitButton";

export default function DuelPage() {
  const {
    status,
    storedUsername,
    language,
    setLanguage,
    opponentUsername,
    question,
    questionIndex,
    total,
    scores,
    selectedAnswerId,
    correctAnswerId,
    endResult,
    errorMessage,
    findOpponent,
    requeue,
    answer,
    leave,
  } = useDuel();
  const t = useTranslation(language);

  const [username, setUsername] = useState(storedUsername ?? "");

  if (status === "idle" || status === "error") {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-950 text-white px-4">
        <LanguageSwitcher
          value={language}
          onChange={setLanguage}
          className="absolute top-4 right-4"
        />
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Swords /> {t("duelTitle")}
        </h1>
        <p className="text-slate-300 text-center max-w-sm">
          {t("duelIntro")}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (username.trim().length >= 3) void findOpponent(username.trim());
          }}
          className="flex flex-col gap-3 w-full max-w-xs"
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("usernamePlaceholder")}
            minLength={3}
            maxLength={20}
            className="rounded-xl bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" className="w-full justify-center">
            {t("findOpponent")}
          </Button>
        </form>
        {errorMessage && (
          <p className="text-rose-400 text-sm">{errorMessage}</p>
        )}
        <Link href="/" className="text-slate-400 text-sm hover:text-white">
          {t("backHome")}
        </Link>
      </main>
    );
  }

  if (status === "identifying" || status === "queue") {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950 text-white">
        <ExitButton
          label={t("quit")}
          onBeforeLeave={leave}
          className="absolute top-4 left-4"
        />
        <Loader2 className="animate-spin" size={32} />
        <p className="text-slate-300">
          {status === "identifying" ? t("connecting") : t("searchingOpponent")}
        </p>
        <button onClick={leave} className="text-slate-500 text-sm underline">
          {t("cancel")}
        </button>
      </main>
    );
  }

  if (status === "finished" && endResult) {
    const resultLabel =
      endResult.result === "win"
        ? t("win")
        : endResult.result === "loss"
          ? t("loss")
          : t("draw");

    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-950 text-white text-center px-4">
        <h1 className="text-4xl font-bold">{resultLabel}</h1>
        {endResult.reason === "opponent-left" && (
          <p className="text-slate-400">{t("opponentLeft")}</p>
        )}
        <p className="text-2xl text-slate-300">
          {scores.me} - {scores.opponent}
        </p>
        <div className="flex gap-4">
          <Button onClick={requeue}>{t("replay")}</Button>
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

  if (!question) return null;

  const result =
    status === "round-result"
      ? { correct: selectedAnswerId === correctAnswerId, correctAnswerId }
      : null;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4 py-10">
      <ExitButton
        label={t("quit")}
        confirmMessage={t("confirmForfeit")}
        onBeforeLeave={leave}
        className="absolute top-4 left-4"
      />
      <div className="w-full max-w-xl mx-auto mb-8">
        <div className="flex items-center justify-between text-sm text-slate-300 mb-2">
          <span>
            {t("questionOf", {
              current: Math.min(questionIndex + 1, total),
              total,
            })}
          </span>
          <span>
            {t("you")} <span className="text-blue-400">{scores.me}</span> —{" "}
            {scores.opponent}{" "}
            <span className="text-slate-400">{opponentUsername}</span>
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${total > 0 ? (questionIndex / total) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      <QuizCard
        question={question}
        selectedAnswerId={selectedAnswerId}
        result={result}
        language={language ?? "fr"}
        onSelect={(answerId) => answer(answerId)}
      />

      {status === "waiting-opponent" && (
        <p className="mt-6 text-slate-400 text-sm">
          {t("waitingForOpponent", { opponent: opponentUsername ?? "" })}
        </p>
      )}
    </main>
  );
}
