import { translate } from "@/src/lib/i18n";
import type { TranslationKey } from "@/src/lib/i18n";
import type { Language } from "@/src/types/quiz";

export function useTranslation(language: Language | null) {
  const lang = language ?? "fr";

  return (key: TranslationKey, vars?: Record<string, string | number>) =>
    translate(lang, key, vars);
}
