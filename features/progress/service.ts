import "server-only";

import {
  setTaskProgress,
  upsertFeedback,
  upsertOutcomeCheckin,
} from "@/lib/assessments";
import type {
  OutcomeCheckinInput,
  RecommendationFeedbackInput,
  TaskProgressInput,
} from "@/features/progress/schemas";

export function persistTaskProgress(userId: string, input: TaskProgressInput) {
  setTaskProgress({
    userId,
    assessmentId: input.assessmentId,
    taskKey: input.taskKey,
    completed: input.completed,
  });
}

export function persistRecommendationFeedback(userId: string, input: RecommendationFeedbackInput) {
  upsertFeedback({
    userId,
    assessmentId: input.assessmentId,
    helpful: input.helpful,
    reason: input.reason,
  });
}

export function persistOutcomeCheckin(userId: string, input: OutcomeCheckinInput) {
  upsertOutcomeCheckin({
    userId,
    assessmentId: input.assessmentId,
    projectsCompleted: input.projectsCompleted,
    interviewsStarted: input.interviewsStarted,
    notes: input.notes,
  });
}
