import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "pathfinder_auth";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14;

type SessionPayload = {
  userId: string;
  createdAt: string;
};

export type AuthSessionUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

function getSessionSecret() {
  return process.env.SESSION_SECRET ?? "development-only-pathfinder-secret-change-me";
}

function sign(data: string) {
  return createHmac("sha256", getSessionSecret()).update(data).digest("base64url");
}

function encode(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = sign(body);
  return `${body}.${signature}`;
}

function decode(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) {
    return null;
  }

  const expected = sign(body);
  const providedBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  if (providedBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(providedBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    return payload;
  } catch {
    return null;
  }
}

export async function startAuthSession(userId: string) {
  const cookieStore = await cookies();
  const token = encode({
    userId,
    createdAt: new Date().toISOString(),
  });

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function endAuthSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser(): Promise<AuthSessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  const payload = decode(token);
  if (!payload) {
    return null;
  }

  try {
    const { getUserById } = await import("@/lib/auth");
    return getUserById(payload.userId);
  } catch (error) {
    console.error("[PathFinder Auth] Failed to load user from session.", error);
    return null;
  }
}
