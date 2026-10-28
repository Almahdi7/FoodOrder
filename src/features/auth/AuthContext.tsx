import { createContext } from "react";
import type { User } from "@/types";
import type { LoginPayload, RegisterPayload } from "./Types";

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean; // true while we check an existing token on app start
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
