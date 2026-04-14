import "server-only";

import { randomBytes, scryptSync, timingSafeEqual, randomUUID } from "node:crypto";
import { query } from "@/lib/postgres";

type DbUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string) {
  const [salt, originalHash] = stored.split(":");
  if (!salt || !originalHash) {
    return false;
  }

  const hashBuffer = scryptSync(password, salt, 64);
  const originalBuffer = Buffer.from(originalHash, "hex");

  if (hashBuffer.length !== originalBuffer.length) {
    return false;
  }

  return timingSafeEqual(hashBuffer, originalBuffer);
}

function mapUser(row: DbUser): AuthUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
  };
}

export async function getUserByEmail(email: string) {
  const result = await query<DbUser>(
    "SELECT id, name, email, password_hash, created_at FROM users WHERE email = $1 LIMIT 1",
    [email.toLowerCase()],
  );
  return result.rows[0] ?? null;
}

export async function getUserById(id: string) {
  const result = await query<DbUser>(
    "SELECT id, name, email, password_hash, created_at FROM users WHERE id = $1 LIMIT 1",
    [id],
  );
  const row = result.rows[0];
  return row ? mapUser(row) : null;
}

export async function createUser(input: { name: string; email: string; password: string }) {
  const now = new Date().toISOString();
  const id = randomUUID();
  const passwordHash = hashPassword(input.password);
  const name = input.name.trim();
  const email = input.email.toLowerCase().trim();

  await query(
    "INSERT INTO users (id, name, email, password_hash, created_at) VALUES ($1, $2, $3, $4, $5)",
    [id, name, email, passwordHash, now],
  );

  return { id, name, email, createdAt: now };
}

export async function updateUserPasswordById(userId: string, password: string) {
  const passwordHash = hashPassword(password);
  const result = await query("UPDATE users SET password_hash = $1 WHERE id = $2", [
    passwordHash,
    userId,
  ]);
  return (result.rowCount ?? 0) > 0;
}

export async function authenticateUser(input: { email: string; password: string }) {
  const user = await getUserByEmail(input.email);
  if (!user) {
    return null;
  }

  const isValid = verifyPassword(input.password, user.password_hash);
  if (!isValid) {
    return null;
  }

  return mapUser(user);
}
