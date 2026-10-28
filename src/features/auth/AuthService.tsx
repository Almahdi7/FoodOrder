import { http } from "@/api/http";
import type { User } from "@/types";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/features/auth/Types";

export const authService = {
  login: (payload: LoginPayload) =>
    http.post<AuthResponse>("/auth/login", payload).then((r) => r.data),

  register: (payload: RegisterPayload) =>
    http.post<AuthResponse>("/auth/register", payload).then((r) => r.data),

  me: () => http.get<User>("/auth/me").then((r) => r.data),
};
