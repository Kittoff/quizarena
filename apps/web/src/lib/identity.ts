const STORAGE_KEY = "quiz-arena-identity";

export interface Identity {
  id: string;
  username: string;
}

function isIdentity(value: unknown): value is Identity {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Identity).id === "string" &&
    typeof (value as Identity).username === "string"
  );
}

export function getStoredIdentity(): Identity | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    return isIdentity(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function storeIdentity(identity: Identity) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
}
