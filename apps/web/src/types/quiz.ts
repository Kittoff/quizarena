export type Language = "fr" | "en" | "ja";

export interface Answer {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  category: string;
  difficulty: number;
  text: string;
  answers: Answer[];
}

export interface AnswerCheckResult {
  correct: boolean;
  correctAnswerId: number | null;
}

export type QuizStatus = "loading" | "playing" | "finished" | "error";
