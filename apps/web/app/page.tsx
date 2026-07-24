"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swords, Trophy, User, Play } from "lucide-react";
import { useLanguagePreference } from "@/src/hooks/useLanguagePreference";
import { useTranslation } from "@/src/hooks/useTranslation";
import { LanguageSwitcher } from "@/src/app/components/LanguageSwitcher";

export default function Home() {
  const { language, setLanguage } = useLanguagePreference();
  const t = useTranslation(language);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <LanguageSwitcher
        value={language}
        onChange={setLanguage}
        className="absolute top-4 right-4"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-4">QuizArena</h1>

        <p className="text-xl text-slate-300 mb-10">{t("tagline")}</p>

        <div className="flex flex-col gap-4">
          <Link
            href="/duel"
            className="
            flex items-center justify-center gap-3
            rounded-xl
            bg-blue-600
            px-8 py-4
            text-lg
            hover:bg-blue-500
            transition
            "
          >
            <Swords />
            {t("duel")}
          </Link>

          <Link
            href="/training"
            className="
            flex items-center justify-center gap-3
            rounded-xl
            bg-slate-800
            px-8 py-4
            text-lg
            hover:bg-slate-700
            transition
            "
          >
            <Play />
            {t("training")}
          </Link>

          <button
            disabled
            title={t("comingSoon")}
            className="
            flex items-center justify-center gap-3
            rounded-xl
            bg-slate-800
            px-8 py-4
            text-lg
            opacity-50 cursor-not-allowed
            "
          >
            <Trophy />
            {t("ranking")}
          </button>

          <button
            disabled
            title={t("comingSoon")}
            className="
            flex items-center justify-center gap-3
            rounded-xl
            bg-slate-800
            px-8 py-4
            text-lg
            opacity-50 cursor-not-allowed
            "
          >
            <User />
            {t("profile")}
          </button>
        </div>
      </motion.div>
    </main>
  );
}
