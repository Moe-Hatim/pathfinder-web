import "server-only";

import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dataDir = path.join(process.cwd(), "data");
mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "pathfinder.db");
const sqlite = new Database(dbPath, { timeout: 10000 });

sqlite.pragma("busy_timeout = 10000");
sqlite.pragma("journal_mode = WAL");

function ensureColumn(table: "assessments", column: string, definition: string) {
  const columns = sqlite
    .prepare(`PRAGMA table_info(${table})`)
    .all() as Array<{ name: string }>;
  const exists = columns.some((item) => item.name === column);
  if (!exists) {
    sqlite.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    used_at TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_created
  ON password_reset_tokens(user_id, created_at DESC);

  CREATE TABLE IF NOT EXISTS assessments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    field TEXT NOT NULL,
    goal TEXT NOT NULL,
    interest TEXT NOT NULL,
    level TEXT NOT NULL,
    hours_per_week INTEGER NOT NULL,
    work_style TEXT NOT NULL DEFAULT 'Balanced',
    math_comfort TEXT NOT NULL DEFAULT 'Medium',
    thinking_style TEXT NOT NULL DEFAULT 'Balanced',
    timeline_urgency TEXT NOT NULL DEFAULT '3-6 Months',
    recommendation_top_json TEXT NOT NULL,
    recommendation_alternatives_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_assessments_user_created
  ON assessments(user_id, created_at DESC);

  CREATE TABLE IF NOT EXISTS task_progress (
    user_id TEXT NOT NULL,
    assessment_id TEXT NOT NULL,
    task_key TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (user_id, assessment_id, task_key),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (assessment_id) REFERENCES assessments(id)
  );

  CREATE TABLE IF NOT EXISTS recommendation_feedback (
    user_id TEXT NOT NULL,
    assessment_id TEXT NOT NULL,
    helpful INTEGER NOT NULL,
    reason TEXT,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (user_id, assessment_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (assessment_id) REFERENCES assessments(id)
  );

  CREATE TABLE IF NOT EXISTS outcome_checkins (
    user_id TEXT NOT NULL,
    assessment_id TEXT NOT NULL,
    projects_completed INTEGER NOT NULL DEFAULT 0,
    interviews_started INTEGER NOT NULL DEFAULT 0,
    notes TEXT,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (user_id, assessment_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (assessment_id) REFERENCES assessments(id)
  );
`);

ensureColumn("assessments", "work_style", "TEXT NOT NULL DEFAULT 'Balanced'");
ensureColumn("assessments", "math_comfort", "TEXT NOT NULL DEFAULT 'Medium'");
ensureColumn("assessments", "thinking_style", "TEXT NOT NULL DEFAULT 'Balanced'");
ensureColumn("assessments", "timeline_urgency", "TEXT NOT NULL DEFAULT '3-6 Months'");

export const db = sqlite;
