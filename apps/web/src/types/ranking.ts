import type { AuthUser } from "@/src/lib/auth";

export interface RankingEntry extends AuthUser {
  rank: number;
}
