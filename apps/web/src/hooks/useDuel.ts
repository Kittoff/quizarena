"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getDuelSocket } from "@/src/lib/socket";
import { getStoredIdentity, storeIdentity } from "@/src/lib/identity";
import type { Identity } from "@/src/lib/identity";
import { useLanguagePreference } from "@/src/hooks/useLanguagePreference";
import { useDuelStore } from "@/src/store/duelStore";
import type {
  DuelEndPayload,
  DuelQuestionPayload,
  DuelRoundResultPayload,
} from "@/src/types/duel";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function identify(username: string): Promise<Identity> {
  const res = await fetch(`${API_URL}/users/identify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  if (!res.ok) {
    const body: unknown = await res.json().catch(() => null);
    const message =
      body && typeof body === "object" && "message" in body
        ? String((body as { message: unknown }).message)
        : "Impossible de créer ce pseudo";
    throw new Error(message);
  }

  const user = (await res.json()) as { id: string; username: string };
  return { id: user.id, username: user.username };
}

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

  const [identity, setIdentity] = useState<Identity | null>(() =>
    getStoredIdentity(),
  );
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
  }, [applyEnd, applyQuestion, applyRoundResult, setError, setStatus, startQueue]);

  const joinQueue = useCallback(
    (player: Identity) => {
      const socket = getDuelSocket();
      if (!socket.connected) socket.connect();
      socket.emit("duel:join", {
        userId: player.id,
        username: player.username,
        language: language ?? "fr",
      });
    },
    [language],
  );

  const findOpponent = useCallback(
    async (username: string) => {
      setStatus("identifying");
      try {
        const nextIdentity = await identify(username);
        storeIdentity(nextIdentity);
        setIdentity(nextIdentity);
        joinQueue(nextIdentity);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erreur inconnue");
      }
    },
    [joinQueue, setStatus, setError],
  );

  const requeue = useCallback(() => {
    reset();
    if (identity) {
      setStatus("identifying");
      joinQueue(identity);
    }
  }, [identity, joinQueue, reset, setStatus]);

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
    storedUsername: identity?.username ?? null,
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
