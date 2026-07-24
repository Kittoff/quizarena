import { create } from "zustand";
import type {
  AnswerCheckResult,
  Language,
  Question,
  QuizStatus,
} from "@/src/types/quiz";

interface QuizState {
  status: QuizStatus;
  language: Language;
  questions: Question[];
  currentIndex: number;
  score: number;
  selectedAnswerId: number | null;
  result: AnswerCheckResult | null;
  setLanguage: (language: Language) => void;
  setStatus: (status: QuizStatus) => void;
  setQuestions: (questions: Question[]) => void;
  selectAnswer: (answerId: number, result: AnswerCheckResult) => void;
  goToNext: () => void;
  reset: () => void;
}

const initialState = {
  status: "loading" as QuizStatus,
  questions: [] as Question[],
  currentIndex: 0,
  score: 0,
  selectedAnswerId: null as number | null,
  result: null as AnswerCheckResult | null,
};

export const useQuizStore = create<QuizState>((set, get) => ({
  ...initialState,
  language: "fr",
  setLanguage: (language) => set({ language }),
  setStatus: (status) => set({ status }),
  setQuestions: (questions) =>
    set({ questions, status: questions.length > 0 ? "playing" : "error" }),
  selectAnswer: (answerId, result) => {
    if (get().selectedAnswerId !== null) return;
    set((state) => ({
      selectedAnswerId: answerId,
      result,
      score: result.correct ? state.score + 1 : state.score,
    }));
  },
  goToNext: () => {
    const { currentIndex, questions } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      set({ status: "finished" });
      return;
    }
    set({ currentIndex: nextIndex, selectedAnswerId: null, result: null });
  },
  reset: () => set({ ...initialState }),
}));
