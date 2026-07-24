"use client";

import { useCallback, useState } from "react";
import { useAuthStore } from "@/src/store/authStore";
import type { AuthSession } from "@/src/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function request(
  path: string,
  username: string,
  password: string,
): Promise<AuthSession> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const body: unknown = await res.json().catch(() => null);
    const message =
      body && typeof body === "object" && "message" in body
        ? String((body as { message: unknown }).message)
        : "Une erreur est survenue";
    throw new Error(message);
  }

  return (await res.json()) as AuthSession;
}

export function useAuth() {
  const session = useAuthStore((s) => s.session);
  const setSession = useAuthStore((s) => s.setSession);
  const clear = useAuthStore((s) => s.clear);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = useCallback(
    async (path: string, username: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await request(path, username, password);
        setSession(result);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setSession],
  );

  const register = useCallback(
    (username: string, password: string) =>
      submit("/auth/register", username, password),
    [submit],
  );

  const login = useCallback(
    (username: string, password: string) =>
      submit("/auth/login", username, password),
    [submit],
  );

  return {
    user: session?.user ?? null,
    accessToken: session?.accessToken ?? null,
    isAuthenticated: session !== null,
    isLoading,
    error,
    register,
    login,
    logout: clear,
  };
}
