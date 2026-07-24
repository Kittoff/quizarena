"use client";

import { useCallback, useEffect, useState } from "react";
import { resolveInitialLanguage, storeLanguage } from "@/src/lib/language";
import type { Language } from "@/src/types/quiz";

export function useLanguagePreference() {
  const [language, setLanguageState] = useState<Language | null>(null);

  useEffect(() => {
    let cancelled = false;
    void resolveInitialLanguage().then((resolved) => {
      if (!cancelled) setLanguageState(resolved);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    storeLanguage(next);
  }, []);

  return { language, setLanguage };
}
