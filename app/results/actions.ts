"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth-session";
import { recommendationFeedbackSchema } from "@/features/progress/schemas";
import { persistRecommendationFeedback } from "@/features/progress/service";
import { createRequestContext, logEvent } from "@/features/shared/observability";

export async function submitRecommendationFeedbackAction(input: {
  assessmentId: string;
  helpful: boolean;
  reason: string;
}) {
  const ctx = createRequestContext("results.feedback");
  const user = await getCurrentUser();
  if (!user) {
    logEvent("warn", ctx, "unauthorized");
    throw new Error("Unauthorized");
  }

  const parsed = recommendationFeedbackSchema.safeParse({
    assessmentId: input.assessmentId,
    helpful: input.helpful,
    reason: input.reason,
  });

  if (!parsed.success) {
    logEvent("warn", ctx, "validation_failed");
    throw new Error("Invalid feedback payload");
  }

  await persistRecommendationFeedback(user.id, parsed.data);

  logEvent("info", ctx, "feedback_saved");
  revalidatePath("/results");
}
