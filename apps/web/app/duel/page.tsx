"use client";

import Link from "next/link";
import { Loader2, Swords } from "lucide-react";
import { useDuel } from "@/src/hooks/useDuel";
import { useAuth } from "@/src/hooks/useAuth";
import { useTranslation } from "@/src/hooks/useTranslation";
import { QuizCard } from "@/src/app/components/QuizCard";
import { Button } from "@/src/app/components/Button";
import { LanguageSwitcher } from "@/src/app/components/LanguageSwitcher";
import { ExitButton } from "@/src/app/components/ExitButton";

export default function DuelPage() {
  const {
    status,
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
  const { user, isAuthenticated, logout } = useAuth();
  const t = useTranslation(language);

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

        {isAuthenticated ? (
          <>
            <p className="text-slate-300 text-center max-w-sm">
              {user?.username}
            </p>
            <Button onClick={findOpponent} className="w-full max-w-xs justify-center">
              {t("findOpponent")}
            </Button>
            <button
              onClick={logout}
              className="text-slate-500 text-sm hover:text-white"
            >
              {t("logout")}
            </button>
          </>
        ) : (
          <>
            <p className="text-slate-300 text-center max-w-sm">
              {t("loginRequired")}
            </p>
            <Link href="/login">
              <Button className="w-full max-w-xs justify-center">
                {t("login")}
              </Button>
            </Link>
          </>
        )}

        {errorMessage && <p className="text-rose-400 text-sm">{errorMessage}</p>}
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
