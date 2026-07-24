"use client";

import { useCallback, useEffect, useRef } from "react";
import { getDuelSocket } from "@/src/lib/socket";
import { useAuth } from "@/src/hooks/useAuth";
import { useLanguagePreference } from "@/src/hooks/useLanguagePreference";
import { useDuelStore } from "@/src/store/duelStore";
import type {
  DuelEndPayload,
  DuelQuestionPayload,
  DuelRoundResultPayload,
} from "@/src/types/duel";

export function useDuel() {
  const status = useDuelStore((s) => s.status);
  const opponentUsername = useDuelStore((s) => s.opponentUsername);
  const question = useDuelStore((s) => s.question);
  const questionIndex = useDuelStore((s) => s.questionIndex);
  const total = useDuelStore((s) => s.total);
  const scores = useDuelStore((s) => s.scores);
  const selectedAnswerId = useDuelStore((s) => s.selectedAnswerId);
  const correctAnswerId = useDuelStore((s) => s.correctAnswerId);
  const endResult = useDuelStore((s) => s.endResult);
  const errorMessage = useDuelStore((s) => s.errorMessage);

  const setStatus = useDuelStore((s) => s.setStatus);
  const setError = useDuelStore((s) => s.setError);
  const startQueue = useDuelStore((s) => s.startQueue);
  const applyQuestion = useDuelStore((s) => s.applyQuestion);
  const selectAnswerAction = useDuelStore((s) => s.selectAnswer);
  const applyRoundResult = useDuelStore((s) => s.applyRoundResult);
  const applyEnd = useDuelStore((s) => s.applyEnd);
  const reset = useDuelStore((s) => s.reset);

  const { accessToken } = useAuth();
  const { language, setLanguage } = useLanguagePreference();
  const listenersReady = useRef(false);

  useEffect(() => {
    if (listenersReady.current) return;
    listenersReady.current = true;

    const socket = getDuelSocket();
    socket.on("duel:queued", () => startQueue());
    socket.on("duel:question", (payload: DuelQuestionPayload) =>
      applyQuestion(payload),
    );
    socket.on("duel:waiting-opponent", () => setStatus("waiting-opponent"));
    socket.on("duel:round-result", (payload: DuelRoundResultPayload) =>
      applyRoundResult(payload),
    );
    socket.on("duel:end", (payload: DuelEndPayload) => applyEnd(payload));
    socket.on("connect_error", () =>
      setError("Connexion au serveur de duel impossible"),
    );
  }, [
    applyEnd,
    applyQuestion,
    applyRoundResult,
    setError,
    setStatus,
    startQueue,
  ]);

  const findOpponent = useCallback(() => {
    if (!accessToken) {
      setError("Connecte-toi pour jouer en duel");
      return;
    }

    setStatus("identifying");
    const socket = getDuelSocket();
    socket.auth = { token: accessToken };
    if (!socket.connected) socket.connect();
    socket.emit("duel:join", { language: language ?? "fr" });
  }, [accessToken, language, setStatus, setError]);

  const requeue = useCallback(() => {
    reset();
    findOpponent();
  }, [reset, findOpponent]);

  const answer = useCallback(
    (answerId: number) => {
      if (!question) return;
      const socket = getDuelSocket();
      socket.emit("duel:answer", {
        gameId: useDuelStore.getState().gameId,
        questionIndex,
        answerId,
      });
      selectAnswerAction(answerId);
    },
    [question, questionIndex, selectAnswerAction],
  );

  const leave = useCallback(() => {
    const socket = getDuelSocket();
    socket.emit("duel:leave");
    socket.disconnect();
    reset();
  }, [reset]);

  return {
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
  };
}
