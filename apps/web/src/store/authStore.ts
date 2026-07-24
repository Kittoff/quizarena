import { create } from "zustand";
import { clearSession, getStoredSession, storeSession } from "@/src/lib/auth";
import type { AuthSession, AuthUser } from "@/src/lib/auth";

interface AuthState {
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
  updateUser: (user: AuthUser) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: getStoredSession(),
  setSession: (session) => {
    storeSession(session);
    set({ session });
  },
  updateUser: (user) => {
    const current = get().session;
    if (!current) return;
    const updated = { ...current, user };
    storeSession(updated);
    set({ session: updated });
  },
  clear: () => {
    clearSession();
    set({ session: null });
  },
}));
