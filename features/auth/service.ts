import "server-only";

import { authenticateUser, createUser, getUserByEmail } from "@/lib/auth";
import type { LoginInput, SignupInput } from "@/features/auth/schemas";

export type AuthResult =
  | { ok: true; userId: string }
  | { ok: false; code: "invalid_input" | "email_exists" | "invalid_credentials" };

export function registerUser(input: SignupInput): AuthResult {
  if (getUserByEmail(input.email)) {
    return { ok: false, code: "email_exists" };
  }

  const user = createUser(input);
  return { ok: true, userId: user.id };
}

export function loginUser(input: LoginInput): AuthResult {
  const user = authenticateUser(input);
  if (!user) {
    return { ok: false, code: "invalid_credentials" };
  }
  return { ok: true, userId: user.id };
}
