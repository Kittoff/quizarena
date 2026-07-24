import type { Question } from "@/src/types/quiz";

export type DuelStatus =
  | "idle"
  | "identifying"
  | "queue"
  | "playing"
  | "waiting-opponent"
  | "round-result"
  | "finished"
  | "error";

export interface DuelScores {
  me: number;
  opponent: number;
}

export interface DuelQuestionPayload {
  gameId: string;
  questionIndex: number;
  total: number;
  question: Question;
  scores: DuelScores;
  opponent: { username: string };
}

export interface DuelRoundResultPayload {
  correctAnswerId: number | null;
  scores: DuelScores;
}

export type DuelEndResult = "win" | "loss" | "draw";

export interface DuelEndPayload {
  result: DuelEndResult;
  scores: DuelScores;
  reason?: "opponent-left";
}
