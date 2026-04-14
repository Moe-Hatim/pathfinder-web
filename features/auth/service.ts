import "server-only";

import { authenticateUser, createUser, getUserByEmail } from "@/lib/auth";
import type { LoginInput, SignupInput } from "@/features/auth/schemas";

export type AuthResult =
  | { ok: true; userId: string }
  | { ok: false; code: "invalid_input" | "email_exists" | "invalid_credentials" };

export async function registerUser(input: SignupInput): Promise<AuthResult> {
  if (await getUserByEmail(input.email)) {
    return { ok: false, code: "email_exists" };
  }

  const user = await createUser(input);
  return { ok: true, userId: user.id };
}

export async function loginUser(input: LoginInput): Promise<AuthResult> {
  const user = await authenticateUser(input);
  if (!user) {
    return { ok: false, code: "invalid_credentials" };
  }
  return { ok: true, userId: user.id };
}
