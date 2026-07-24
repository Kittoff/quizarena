import type { Language } from "@/src/types/quiz";

const SUPPORTED_LANGUAGES: Language[] = ["fr", "en", "ja"];
const STORAGE_KEY = "quiz-arena-language";
const DEFAULT_LANGUAGE: Language = "fr";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function isSupported(value: string): value is Language {
  return (SUPPORTED_LANGUAGES as string[]).includes(value);
}

export function getStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && isSupported(stored) ? stored : null;
}

export function getBrowserLanguage(): Language {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  const short = navigator.language.slice(0, 2);
  return isSupported(short) ? short : DEFAULT_LANGUAGE;
}

export async function fetchGeoLanguage(): Promise<Language | null> {
  try {
    const res = await fetch(`${API_URL}/geo/language`);
    if (!res.ok) return null;
    const body = (await res.json()) as { language: string | null };
    return body.language && isSupported(body.language)
      ? body.language
      : null;
  } catch {
    return null;
  }
}

/**
 * Resolution order: explicit manual choice > IP-based geolocation guess >
 * browser locale > default. Only the manual choice is persisted — the other
 * two are re-evaluated every time there is no stored preference yet.
 */
export async function resolveInitialLanguage(): Promise<Language> {
  const stored = getStoredLanguage();
  if (stored) return stored;

  const geo = await fetchGeoLanguage();
  if (geo) return geo;

  return getBrowserLanguage();
}

export function storeLanguage(language: Language) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, language);
}
