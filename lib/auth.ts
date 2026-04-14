import "server-only";

import { randomBytes, scryptSync, timingSafeEqual, randomUUID } from "node:crypto";
import { db } from "@/lib/db";

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

export function getUserByEmail(email: string) {
  const stmt = db.prepare(
    "SELECT id, name, email, password_hash, created_at FROM users WHERE email = ?",
  );
  const row = stmt.get(email.toLowerCase()) as DbUser | undefined;
  return row;
}

export function getUserById(id: string) {
  const stmt = db.prepare(
    "SELECT id, name, email, password_hash, created_at FROM users WHERE id = ?",
  );
  const row = stmt.get(id) as DbUser | undefined;
  return row ? mapUser(row) : null;
}

export function createUser(input: { name: string; email: string; password: string }) {
  const now = new Date().toISOString();
  const id = randomUUID();
  const passwordHash = hashPassword(input.password);

  const stmt = db.prepare(
    "INSERT INTO users (id, name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)",
  );
  stmt.run(id, input.name.trim(), input.email.toLowerCase().trim(), passwordHash, now);

  return { id, name: input.name.trim(), email: input.email.toLowerCase().trim(), createdAt: now };
}

export function updateUserPasswordById(userId: string, password: string) {
  const passwordHash = hashPassword(password);
  const stmt = db.prepare("UPDATE users SET password_hash = ? WHERE id = ?");
  const result = stmt.run(passwordHash, userId);
  return result.changes > 0;
}

export function authenticateUser(input: { email: string; password: string }) {
  const user = getUserByEmail(input.email);
  if (!user) {
    return null;
  }

  const isValid = verifyPassword(input.password, user.password_hash);
  if (!isValid) {
    return null;
  }

  return mapUser(user);
}
