"use client";

import { useCallback, useEffect, useRef } from "react";
import { useQuizStore } from "@/src/store/quizStore";
import { resolveInitialLanguage, storeLanguage } from "@/src/lib/language";
import type { AnswerCheckResult, Language, Question } from "@/src/types/quiz";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function fetchQuestions(language: Language): Promise<Question[]> {
  const res = await fetch(`${API_URL}/questions?lang=${language}`);
  if (!res.ok) throw new Error("Failed to load questions");
  return (await res.json()) as Question[];
}

async function submitAnswer(
  questionId: number,
  answerId: number,
): Promise<AnswerCheckResult> {
  const res = await fetch(`${API_URL}/questions/${questionId}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answerId }),
  });
  if (!res.ok) throw new Error("Failed to check answer");
  return (await res.json()) as AnswerCheckResult;
}

export function useQuiz() {
  const status = useQuizStore((state) => state.status);
  const language = useQuizStore((state) => state.language);
  const questions = useQuizStore((state) => state.questions);
  const currentIndex = useQuizStore((state) => state.currentIndex);
  const score = useQuizStore((state) => state.score);
  const selectedAnswerId = useQuizStore((state) => state.selectedAnswerId);
  const result = useQuizStore((state) => state.result);

  const setLanguage = useQuizStore((state) => state.setLanguage);
  const setStatus = useQuizStore((state) => state.setStatus);
  const setQuestions = useQuizStore((state) => state.setQuestions);
  const selectAnswer = useQuizStore((state) => state.selectAnswer);
  const goToNext = useQuizStore((state) => state.goToNext);
  const reset = useQuizStore((state) => state.reset);

  const initializedRef = useRef(false);

  const load = useCallback(
    async (lang: Language) => {
      setStatus("loading");
      try {
        const fetched = await fetchQuestions(lang);
        setQuestions(fetched);
      } catch {
        setStatus("error");
      }
    },
    [setStatus, setQuestions],
  );

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    void (async () => {
      const initialLanguage = await resolveInitialLanguage();
      setLanguage(initialLanguage);
      void load(initialLanguage);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLanguage = useCallback(
    (nextLanguage: Language) => {
      setLanguage(nextLanguage);
      storeLanguage(nextLanguage);
      void load(nextLanguage);
    },
    [load, setLanguage],
  );

  const currentQuestion = questions[currentIndex] ?? null;

  const answer = useCallback(
    async (answerId: number) => {
      if (!currentQuestion || selectedAnswerId !== null) return;
      try {
        const checkResult = await submitAnswer(currentQuestion.id, answerId);
        selectAnswer(answerId, checkResult);
      } catch {
        setStatus("error");
      }
    },
    [currentQuestion, selectedAnswerId, selectAnswer, setStatus],
  );

  const restart = useCallback(() => {
    reset();
    void load(language);
  }, [reset, load, language]);

  return {
    status,
    language,
    questions,
    currentQuestion,
    currentIndex,
    total: questions.length,
    score,
    selectedAnswerId,
    result,
    changeLanguage,
    answer,
    next: goToNext,
    restart,
    quit: reset,
  };
}
