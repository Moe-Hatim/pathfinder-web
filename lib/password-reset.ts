import "server-only";

import { createHash, randomBytes, randomUUID } from "node:crypto";
import { query } from "@/lib/postgres";

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

export async function createPasswordResetToken(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashResetToken(token);
  const id = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + RESET_TOKEN_TTL_MINUTES * 60 * 1000).toISOString();

  await query(
    `INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at, used_at, created_at)
     VALUES ($1, $2, $3, $4, NULL, $5)`,
    [id, userId, tokenHash, expiresAt, now.toISOString()],
  );

  return { token, expiresAt };
}

export async function consumePasswordResetToken(rawToken: string): Promise<{ userId: string } | null> {
  const tokenHash = hashResetToken(rawToken);
  const result = await query<PasswordResetRow>(
    `SELECT id, user_id, expires_at, used_at
     FROM password_reset_tokens
     WHERE token_hash = $1
     LIMIT 1`,
    [tokenHash],
  );

  const row = result.rows[0];
  if (!row || row.used_at) {
    return null;
  }

  if (new Date(row.expires_at).getTime() <= Date.now()) {
    return null;
  }

  const now = new Date().toISOString();
  const updateResult = await query(
    `UPDATE password_reset_tokens
     SET used_at = $1
     WHERE id = $2 AND used_at IS NULL`,
    [now, row.id],
  );

  if (updateResult.rowCount === 0) {
    return null;
  }

  return { userId: row.user_id };
}
