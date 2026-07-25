import { create } from "zustand";
import type {
  DuelEndPayload,
  DuelQuestionPayload,
  DuelRoundResultPayload,
  DuelStatus,
} from "@/src/types/duel";
import type { Question } from "@/src/types/quiz";

interface DuelState {
  status: DuelStatus;
  opponentUsername: string | null;
  gameId: string | null;
  question: Question | null;
  questionIndex: number;
  total: number;
  scores: { me: number; opponent: number };
  selectedAnswerId: number | null;
  correctAnswerId: number | null;
  endResult: DuelEndPayload | null;
  errorMessage: string | null;
  opponentDisconnected: boolean;

  setStatus: (status: DuelStatus) => void;
  setError: (message: string) => void;
  startQueue: () => void;
  applyQuestion: (payload: DuelQuestionPayload) => void;
  selectAnswer: (answerId: number) => void;
  applyRoundResult: (payload: DuelRoundResultPayload) => void;
  applyEnd: (payload: DuelEndPayload) => void;
  setOpponentDisconnected: (value: boolean) => void;
  reset: () => void;
}

const initialState = {
  status: "idle" as DuelStatus,
  opponentUsername: null as string | null,
  gameId: null as string | null,
  question: null as Question | null,
  questionIndex: 0,
  total: 0,
  scores: { me: 0, opponent: 0 },
  selectedAnswerId: null as number | null,
  correctAnswerId: null as number | null,
  endResult: null as DuelEndPayload | null,
  errorMessage: null as string | null,
  opponentDisconnected: false,
};

export const useDuelStore = create<DuelState>((set) => ({
  ...initialState,
  setStatus: (status) => set({ status }),
  setError: (message) => set({ status: "error", errorMessage: message }),
  startQueue: () => set({ status: "queue" }),
  applyQuestion: (payload) =>
    set({
      status: "playing",
      gameId: payload.gameId,
      question: payload.question,
      questionIndex: payload.questionIndex,
      total: payload.total,
      scores: payload.scores,
      opponentUsername: payload.opponent.username,
      selectedAnswerId: null,
      correctAnswerId: null,
      opponentDisconnected: false,
    }),
  selectAnswer: (answerId) =>
    set({ status: "waiting-opponent", selectedAnswerId: answerId }),
  applyRoundResult: (payload) =>
    set({
      status: "round-result",
      correctAnswerId: payload.correctAnswerId,
      scores: payload.scores,
      opponentDisconnected: false,
    }),
  applyEnd: (payload) =>
    set({ status: "finished", endResult: payload, scores: payload.scores }),
  setOpponentDisconnected: (value) => set({ opponentDisconnected: value }),
  reset: () => set({ ...initialState }),
}));
