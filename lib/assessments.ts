import "server-only";

import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import type {
  AssessmentInput,
  PathKey,
  RecommendationResult,
} from "@/lib/recommendation";

type DbAssessmentRow = {
  id: string;
  user_id: string;
  name: string;
  field: string;
  goal: string;
  interest: string;
  level: string;
  hours_per_week: number;
  work_style: string | null;
  math_comfort: string | null;
  thinking_style: string | null;
  timeline_urgency: string | null;
  recommendation_top_json: string;
  recommendation_alternatives_json: string;
  created_at: string;
};

type DbFeedbackBiasRow = {
  helpful: number;
  recommendation_top_json: string;
};

export type PersistedAssessment = {
  id: string;
  createdAt: string;
  assessment: AssessmentInput;
  recommendation: RecommendationResult;
};

export type RecommendationFeedback = {
  helpful: boolean;
  reason: string;
  updatedAt: string;
};

export type OutcomeCheckin = {
  projectsCompleted: number;
  interviewsStarted: boolean;
  notes: string;
  updatedAt: string;
};

function toPersisted(row: DbAssessmentRow): PersistedAssessment {
  return {
    id: row.id,
    createdAt: row.created_at,
    assessment: {
      name: row.name,
      field: row.field,
      goal: row.goal as AssessmentInput["goal"],
      interest: row.interest as AssessmentInput["interest"],
      level: row.level as AssessmentInput["level"],
      hoursPerWeek: row.hours_per_week,
      workStyle: (row.work_style ?? "Balanced") as AssessmentInput["workStyle"],
      mathComfort: (row.math_comfort ?? "Medium") as AssessmentInput["mathComfort"],
      thinkingStyle: (row.thinking_style ?? "Balanced") as AssessmentInput["thinkingStyle"],
      timelineUrgency: (row.timeline_urgency ?? "3-6 Months") as AssessmentInput["timelineUrgency"],
    },
    recommendation: {
      top: JSON.parse(row.recommendation_top_json) as RecommendationResult["top"],
      alternatives: JSON.parse(
        row.recommendation_alternatives_json,
      ) as RecommendationResult["alternatives"],
    },
  };
}

export function createAssessmentRecord(input: {
  userId: string;
  assessment: AssessmentInput;
  recommendation: RecommendationResult;
}) {
  const now = new Date().toISOString();
  const id = randomUUID();

  const stmt = db.prepare(`
    INSERT INTO assessments (
      id, user_id, name, field, goal, interest, level, hours_per_week,
      work_style, math_comfort, thinking_style, timeline_urgency,
      recommendation_top_json, recommendation_alternatives_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    input.userId,
    input.assessment.name,
    input.assessment.field,
    input.assessment.goal,
    input.assessment.interest,
    input.assessment.level,
    input.assessment.hoursPerWeek,
    input.assessment.workStyle,
    input.assessment.mathComfort,
    input.assessment.thinkingStyle,
    input.assessment.timelineUrgency,
    JSON.stringify(input.recommendation.top),
    JSON.stringify(input.recommendation.alternatives),
    now,
  );

  return id;
}

function selectBaseQuery(whereClause: string) {
  return `
    SELECT
      id, user_id, name, field, goal, interest, level, hours_per_week,
      work_style, math_comfort, thinking_style, timeline_urgency,
      recommendation_top_json, recommendation_alternatives_json, created_at
    FROM assessments
    ${whereClause}
  `;
}

export function getLatestAssessmentForUser(userId: string): PersistedAssessment | null {
  const stmt = db.prepare(
    `${selectBaseQuery("WHERE user_id = ? ORDER BY created_at DESC LIMIT 1")}`,
  );
  const row = stmt.get(userId) as DbAssessmentRow | undefined;
  return row ? toPersisted(row) : null;
}

export function listAssessmentsForUser(userId: string): PersistedAssessment[] {
  const stmt = db.prepare(`${selectBaseQuery("WHERE user_id = ? ORDER BY created_at DESC")}`);
  const rows = stmt.all(userId) as DbAssessmentRow[];
  return rows.map(toPersisted);
}

export function getAssessmentForUserById(userId: string, assessmentId: string): PersistedAssessment | null {
  const stmt = db.prepare(
    `${selectBaseQuery("WHERE user_id = ? AND id = ? ORDER BY created_at DESC LIMIT 1")}`,
  );
  const row = stmt.get(userId, assessmentId) as DbAssessmentRow | undefined;
  return row ? toPersisted(row) : null;
}

export function listCompletedTasksForAssessment(userId: string, assessmentId: string): string[] {
  const stmt = db.prepare(`
    SELECT task_key FROM task_progress
    WHERE user_id = ? AND assessment_id = ? AND completed = 1
  `);

  const rows = stmt.all(userId, assessmentId) as Array<{ task_key: string }>;
  return rows.map((row) => row.task_key);
}

export function setTaskProgress(input: {
  userId: string;
  assessmentId: string;
  taskKey: string;
  completed: boolean;
}) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO task_progress (user_id, assessment_id, task_key, completed, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(user_id, assessment_id, task_key)
    DO UPDATE SET completed = excluded.completed, updated_at = excluded.updated_at
  `);

  stmt.run(input.userId, input.assessmentId, input.taskKey, input.completed ? 1 : 0, now);
}

export function getFeedbackForAssessment(
  userId: string,
  assessmentId: string,
): RecommendationFeedback | null {
  const stmt = db.prepare(`
    SELECT helpful, reason, updated_at
    FROM recommendation_feedback
    WHERE user_id = ? AND assessment_id = ?
    LIMIT 1
  `);

  const row = stmt.get(userId, assessmentId) as
    | { helpful: number; reason: string | null; updated_at: string }
    | undefined;

  if (!row) {
    return null;
  }

  return {
    helpful: row.helpful === 1,
    reason: row.reason ?? "",
    updatedAt: row.updated_at,
  };
}

export function upsertFeedback(input: {
  userId: string;
  assessmentId: string;
  helpful: boolean;
  reason: string;
}) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO recommendation_feedback (user_id, assessment_id, helpful, reason, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(user_id, assessment_id)
    DO UPDATE SET helpful = excluded.helpful, reason = excluded.reason, updated_at = excluded.updated_at
  `);

  stmt.run(input.userId, input.assessmentId, input.helpful ? 1 : 0, input.reason, now);
}

function pathTitleToKey(title: string): PathKey | null {
  if (title.includes("Frontend")) return "frontend";
  if (title.includes("Backend")) return "backend";
  if (title.includes("Full-Stack")) return "fullstack";
  if (title.includes("Data")) return "data";
  if (title.includes("Cybersecurity")) return "cybersecurity";
  if (title.includes("Mobile")) return "mobile";
  if (title.includes("UI/UX")) return "uiux";
  return null;
}

export function getAdaptivePathBias(limit = 300): Partial<Record<PathKey, number>> {
  const stmt = db.prepare(`
    SELECT rf.helpful, a.recommendation_top_json
    FROM recommendation_feedback rf
    JOIN assessments a ON a.id = rf.assessment_id
    ORDER BY rf.updated_at DESC
    LIMIT ?
  `);

  const rows = stmt.all(limit) as DbFeedbackBiasRow[];
  if (rows.length === 0) {
    return {};
  }

  const tally: Partial<Record<PathKey, { good: number; bad: number }>> = {};

  for (const row of rows) {
    try {
      const top = JSON.parse(row.recommendation_top_json) as { title?: string };
      const key = top.title ? pathTitleToKey(top.title) : null;
      if (!key) {
        continue;
      }

      if (!tally[key]) {
        tally[key] = { good: 0, bad: 0 };
      }

      if (row.helpful === 1) {
        tally[key]!.good += 1;
      } else {
        tally[key]!.bad += 1;
      }
    } catch {
      continue;
    }
  }

  const bias: Partial<Record<PathKey, number>> = {};
  (Object.keys(tally) as PathKey[]).forEach((key) => {
    const entry = tally[key];
    if (!entry) return;
    const total = entry.good + entry.bad;
    if (total < 4) return;

    const ratio = (entry.good - entry.bad) / total;
    const volumeFactor = Math.min(1, total / 20);
    const score = Math.round(ratio * 8 * volumeFactor);
    if (score !== 0) {
      bias[key] = score;
    }
  });

  return bias;
}

export function getOutcomeCheckinForAssessment(
  userId: string,
  assessmentId: string,
): OutcomeCheckin | null {
  const stmt = db.prepare(`
    SELECT projects_completed, interviews_started, notes, updated_at
    FROM outcome_checkins
    WHERE user_id = ? AND assessment_id = ?
    LIMIT 1
  `);

  const row = stmt.get(userId, assessmentId) as
    | {
        projects_completed: number;
        interviews_started: number;
        notes: string | null;
        updated_at: string;
      }
    | undefined;

  if (!row) {
    return null;
  }

  return {
    projectsCompleted: row.projects_completed,
    interviewsStarted: row.interviews_started === 1,
    notes: row.notes ?? "",
    updatedAt: row.updated_at,
  };
}

export function upsertOutcomeCheckin(input: {
  userId: string;
  assessmentId: string;
  projectsCompleted: number;
  interviewsStarted: boolean;
  notes: string;
}) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO outcome_checkins (
      user_id, assessment_id, projects_completed, interviews_started, notes, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id, assessment_id)
    DO UPDATE SET
      projects_completed = excluded.projects_completed,
      interviews_started = excluded.interviews_started,
      notes = excluded.notes,
      updated_at = excluded.updated_at
  `);

  stmt.run(
    input.userId,
    input.assessmentId,
    Math.max(0, Math.min(20, Math.trunc(input.projectsCompleted))),
    input.interviewsStarted ? 1 : 0,
    input.notes.trim(),
    now,
  );
}

export function getAssessmentAgeInDays(assessmentId: string): number {
  const stmt = db.prepare(`
    SELECT CAST((julianday('now') - julianday(created_at)) AS INTEGER) AS age_days
    FROM assessments
    WHERE id = ?
    LIMIT 1
  `);

  const row = stmt.get(assessmentId) as { age_days: number } | undefined;
  return row?.age_days ?? 0;
}
