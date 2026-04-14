"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { endAuthSession, startAuthSession } from "@/lib/auth-session";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "@/features/auth/schemas";
import { loginUser, registerUser } from "@/features/auth/service";
import { getUserByEmail, updateUserPasswordById } from "@/lib/auth";
import { createPasswordResetToken, consumePasswordResetToken } from "@/lib/password-reset";
import { sendPasswordResetEmail } from "@/lib/mailer";
import { createRequestContext, logEvent } from "@/features/shared/observability";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function signupAction(formData: FormData) {
  const ctx = createRequestContext("auth.signup");
  const parsed = signupSchema.safeParse({
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    password: getString(formData, "password"),
  });

  if (!parsed.success) {
    logEvent("warn", ctx, "validation_failed");
    redirect("/auth/signup?error=invalid_input");
  }

  const result = await registerUser(parsed.data);
  if (!result.ok && result.code === "email_exists") {
    logEvent("warn", ctx, "email_exists");
    redirect("/auth/signup?error=email_exists");
  }
  if (!result.ok) {
    logEvent("warn", ctx, "invalid_input");
    redirect("/auth/signup?error=invalid_input");
  }

  await startAuthSession(result.userId);
  logEvent("info", ctx, "signup_success");
  redirect("/home");
}

export async function loginAction(formData: FormData) {
  const ctx = createRequestContext("auth.login");
  const parsed = loginSchema.safeParse({
    email: getString(formData, "email"),
    password: getString(formData, "password"),
  });

  if (!parsed.success) {
    logEvent("warn", ctx, "validation_failed");
    redirect("/auth/login?error=invalid_credentials");
  }

  const result = await loginUser(parsed.data);
  if (!result.ok) {
    logEvent("warn", ctx, "invalid_credentials");
    redirect("/auth/login?error=invalid_credentials");
  }

  await startAuthSession(result.userId);
  logEvent("info", ctx, "login_success");
  redirect("/home");
}

export async function logoutAction() {
  const ctx = createRequestContext("auth.logout");
  await endAuthSession();
  logEvent("info", ctx, "logout_success");
  redirect("/");
}

function getBaseUrlFromHeaders(host: string | null, proto: string | null) {
  if (!host) {
    return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  }

  const protocol = proto ?? (host.includes("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export async function forgotPasswordAction(formData: FormData) {
  const ctx = createRequestContext("auth.forgot_password");
  const parsed = forgotPasswordSchema.safeParse({
    email: getString(formData, "email"),
  });

  if (!parsed.success) {
    logEvent("warn", ctx, "validation_failed");
    redirect("/auth/forgot-password?status=sent");
  }

  const user = await getUserByEmail(parsed.data.email);
  if (user) {
    const { token } = await createPasswordResetToken(user.id);
    const headerStore = await headers();
    const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
    const proto = headerStore.get("x-forwarded-proto");
    const baseUrl = getBaseUrlFromHeaders(host, proto);
    const resetUrl = `${baseUrl}/auth/reset-password?token=${encodeURIComponent(token)}`;

    try {
      const delivery = await sendPasswordResetEmail({
        toEmail: user.email,
        toName: user.name,
        resetUrl,
      });

      logEvent("info", ctx, `token_created_${delivery.provider}`);
      if (!delivery.delivered) {
        redirect("/auth/forgot-password?status=delivery_not_configured");
      }
    } catch (error) {
      logEvent("warn", ctx, "delivery_failed", { error: String(error) });
      redirect("/auth/forgot-password?status=delivery_failed");
    }
  } else {
    logEvent("info", ctx, "email_not_found");
  }

  redirect("/auth/forgot-password?status=sent");
}

export async function resetPasswordAction(formData: FormData) {
  const ctx = createRequestContext("auth.reset_password");
  const parsed = resetPasswordSchema.safeParse({
    token: getString(formData, "token"),
    password: getString(formData, "password"),
    confirmPassword: getString(formData, "confirmPassword"),
  });

  if (!parsed.success) {
    logEvent("warn", ctx, "validation_failed");
    redirect("/auth/reset-password?error=invalid_input");
  }

  const consumed = await consumePasswordResetToken(parsed.data.token);
  if (!consumed) {
    logEvent("warn", ctx, "invalid_or_expired_token");
    redirect("/auth/reset-password?error=invalid_or_expired");
  }

  const updated = await updateUserPasswordById(consumed.userId, parsed.data.password);
  if (!updated) {
    logEvent("warn", ctx, "user_not_found");
    redirect("/auth/reset-password?error=invalid_or_expired");
  }

  logEvent("info", ctx, "password_reset_success");
  redirect("/auth/login?status=password_reset_success");
}
