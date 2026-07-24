"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Trophy } from "lucide-react";
import { useLanguagePreference } from "@/src/hooks/useLanguagePreference";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useAuth } from "@/src/hooks/useAuth";
import { LanguageSwitcher } from "@/src/app/components/LanguageSwitcher";
import type { RankingEntry } from "@/src/types/ranking";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function RankingPage() {
  const { language, setLanguage } = useLanguagePreference();
  const t = useTranslation(language);
  const { user } = useAuth();

  const [entries, setEntries] = useState<RankingEntry[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/ranking`)
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        return res.json() as Promise<RankingEntry[]>;
      })
      .then((data) => {
        if (!cancelled) setEntries(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center bg-slate-950 text-white px-4 py-10">
      <LanguageSwitcher
        value={language}
        onChange={setLanguage}
        className="absolute top-4 right-4"
      />

      <h1 className="text-4xl font-bold flex items-center gap-3 mb-8">
        <Trophy /> {t("rankingTitle")}
      </h1>

      {!entries && !error && <Loader2 className="animate-spin" size={32} />}

      {error && <p className="text-slate-300">{t("loadFailed")}</p>}

      {entries && (
        <div className="w-full max-w-xl flex flex-col gap-2">
          {entries.length === 0 && (
            <p className="text-slate-400 text-center">{t("noRankingData")}</p>
          )}
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                user?.id === entry.id
                  ? "bg-blue-600/20 ring-1 ring-blue-500"
                  : "bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-slate-400 font-mono">
                  #{entry.rank}
                </span>
                <span className="font-medium">{entry.username}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>
                  {t("level")} {entry.level}
                </span>
                <span className="text-blue-400">{entry.xp} xp</span>
                <span>
                  {entry.wins}
                  {t("winsShort")} / {entry.losses}
                  {t("lossesShort")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href="/" className="mt-8 text-slate-400 text-sm hover:text-white">
        {t("backHome")}
      </Link>
    </main>
  );
}
