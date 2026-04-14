import "server-only";

import { createHash, randomBytes, randomUUID } from "node:crypto";
import { db } from "@/lib/db";

const RESET_TOKEN_TTL_MINUTES = 30;

type PasswordResetRow = {
  id: string;
  user_id: string;
  expires_at: string;
  used_at: string | null;
};

function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function createPasswordResetToken(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashResetToken(token);
  const id = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + RESET_TOKEN_TTL_MINUTES * 60 * 1000).toISOString();

  const stmt = db.prepare(`
    INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at, used_at, created_at)
    VALUES (?, ?, ?, ?, NULL, ?)
  `);

  stmt.run(id, userId, tokenHash, expiresAt, now.toISOString());
  return { token, expiresAt };
}

export function consumePasswordResetToken(rawToken: string): { userId: string } | null {
  const tokenHash = hashResetToken(rawToken);

  const selectStmt = db.prepare(`
    SELECT id, user_id, expires_at, used_at
    FROM password_reset_tokens
    WHERE token_hash = ?
    LIMIT 1
  `);

  const row = selectStmt.get(tokenHash) as PasswordResetRow | undefined;
  if (!row || row.used_at) {
    return null;
  }

  if (new Date(row.expires_at).getTime() <= Date.now()) {
    return null;
  }

  const now = new Date().toISOString();
  const updateStmt = db.prepare(`
    UPDATE password_reset_tokens
    SET used_at = ?
    WHERE id = ? AND used_at IS NULL
  `);

  const result = updateStmt.run(now, row.id);
  if ((result as { changes?: number }).changes === 0) {
    return null;
  }

  return { userId: row.user_id };
}
