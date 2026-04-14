import { z } from "zod";

export const taskProgressSchema = z.object({
  assessmentId: z.string().uuid(),
  taskKey: z.string().trim().min(1).max(160),
  completed: z.boolean(),
});

export const recommendationFeedbackSchema = z.object({
  assessmentId: z.string().uuid(),
  helpful: z.boolean(),
  reason: z.string().trim().max(500),
});

export const outcomeCheckinSchema = z.object({
  assessmentId: z.string().uuid(),
  projectsCompleted: z.coerce.number().int().min(0).max(20),
  interviewsStarted: z.boolean(),
  notes: z.string().trim().max(1200),
});

export type TaskProgressInput = z.infer<typeof taskProgressSchema>;
export type RecommendationFeedbackInput = z.infer<typeof recommendationFeedbackSchema>;
export type OutcomeCheckinInput = z.infer<typeof outcomeCheckinSchema>;
