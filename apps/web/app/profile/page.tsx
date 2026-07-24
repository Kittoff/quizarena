"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User as UserIcon } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { useLanguagePreference } from "@/src/hooks/useLanguagePreference";
import { useTranslation } from "@/src/hooks/useTranslation";
import { Button } from "@/src/app/components/Button";
import { LanguageSwitcher } from "@/src/app/components/LanguageSwitcher";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function ProfilePage() {
  const { user, isAuthenticated, accessToken, logout, refreshUser } = useAuth();
  const { language, setLanguage } = useLanguagePreference();
  const t = useTranslation(language);

  const [rank, setRank] = useState<number | null>(null);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;

    fetch(`${API_URL}/ranking/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => (res.ok ? (res.json() as Promise<{ rank: number | null }>) : null))
      .then((data) => {
        if (!cancelled && data) setRank(data.rank);
      })
      .catch(() => {
        // rank display is best-effort
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  if (!isAuthenticated || !user) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-950 text-white px-4">
        <LanguageSwitcher
          value={language}
          onChange={setLanguage}
          className="absolute top-4 right-4"
        />
        <p className="text-slate-300 text-center max-w-sm">
          {t("profileLoginRequired")}
        </p>
        <Link href="/login">
          <Button className="w-full max-w-xs justify-center">
            {t("login")}
          </Button>
        </Link>
        <Link href="/" className="text-slate-400 text-sm hover:text-white">
          {t("backHome")}
        </Link>
      </main>
    );
  }

  const totalGames = user.wins + user.losses;
  const winRate =
    totalGames > 0 ? Math.round((user.wins / totalGames) * 100) : 0;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-950 text-white px-4">
      <LanguageSwitcher
        value={language}
        onChange={setLanguage}
        className="absolute top-4 right-4"
      />

      <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
        <UserIcon size={40} />
      </div>

      <h1 className="text-3xl font-bold">{user.username}</h1>
      <p className="text-slate-400">
        {t("level")} {user.level} · {user.xp} xp
        {rank !== null && ` · ${t("yourRank")} #${rank}`}
      </p>

      <div className="grid grid-cols-3 gap-4 w-full max-w-sm text-center">
        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-2xl font-bold text-blue-400">{user.wins}</p>
          <p className="text-xs text-slate-400">{t("winsLabel")}</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-2xl font-bold text-rose-400">{user.losses}</p>
          <p className="text-xs text-slate-400">{t("lossesLabel")}</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-2xl font-bold">{winRate}%</p>
          <p className="text-xs text-slate-400">{t("winRate")}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={logout}
          className="text-slate-500 text-sm hover:text-white"
        >
          {t("logout")}
        </button>
        <Link href="/" className="text-slate-400 text-sm hover:text-white">
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
