"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";
import { useLanguagePreference } from "@/src/hooks/useLanguagePreference";
import { useTranslation } from "@/src/hooks/useTranslation";
import { Button } from "@/src/app/components/Button";
import { LanguageSwitcher } from "@/src/app/components/LanguageSwitcher";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, isLoading, error } = useAuth();
  const { language, setLanguage } = useLanguagePreference();
  const t = useTranslation(language);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ok =
      mode === "login"
        ? await login(username, password)
        : await register(username, password);
    if (ok) router.push("/duel");
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-950 text-white px-4">
      <LanguageSwitcher
        value={language}
        onChange={setLanguage}
        className="absolute top-4 right-4"
      />
      <h1 className="text-3xl font-bold">
        {mode === "login" ? t("login") : t("createAccount")}
      </h1>

      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t("usernamePlaceholder")}
          minLength={3}
          maxLength={20}
          className="rounded-xl bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("passwordPlaceholder")}
          minLength={6}
          className="rounded-xl bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full justify-center"
        >
          {mode === "login" ? t("login") : t("createAccount")}
        </Button>
      </form>

      {error && <p className="text-rose-400 text-sm">{error}</p>}

      <button
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        className="text-slate-400 text-sm hover:text-white"
      >
        {mode === "login" ? t("noAccount") : t("haveAccount")}
      </button>

      <Link href="/" className="text-slate-500 text-sm hover:text-white">
        {t("backHome")}
      </Link>
    </main>
  );
}
