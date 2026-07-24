export interface AuthUser {
  id: string;
  username: string;
  xp: number;
  level: number;
  wins: number;
  losses: number;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
}

const STORAGE_KEY = "quiz-arena-auth";

function isAuthSession(value: unknown): value is AuthSession {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  if (typeof v.accessToken !== "string") return false;
  if (typeof v.user !== "object" || v.user === null) return false;
  const user = v.user as Record<string, unknown>;
  return typeof user.id === "string" && typeof user.username === "string";
}

export function getStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    return isAuthSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function storeSession(session: AuthSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
