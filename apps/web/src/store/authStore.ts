import { create } from "zustand";
import { clearSession, getStoredSession, storeSession } from "@/src/lib/auth";
import type { AuthSession } from "@/src/lib/auth";

interface AuthState {
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: getStoredSession(),
  setSession: (session) => {
    storeSession(session);
    set({ session });
  },
  clear: () => {
    clearSession();
    set({ session: null });
  },
}));
