"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth-session";
import { createRequestContext, logEvent } from "@/features/shared/observability";
import { outcomeCheckinSchema, taskProgressSchema } from "@/features/progress/schemas";
import { persistOutcomeCheckin, persistTaskProgress } from "@/features/progress/service";

export async function updateTaskProgressAction(input: {
  assessmentId: string;
  taskKey: string;
  completed: boolean;
}) {
  const ctx = createRequestContext("dashboard.task_progress");
  const user = await getCurrentUser();
  if (!user) {
    logEvent("warn", ctx, "unauthorized");
    throw new Error("Unauthorized");
  }

  const parsed = taskProgressSchema.safeParse(input);
  if (!parsed.success) {
    logEvent("warn", ctx, "validation_failed");
    throw new Error("Invalid task progress payload");
  }

  persistTaskProgress(user.id, {
    assessmentId: parsed.data.assessmentId,
    taskKey: parsed.data.taskKey,
    completed: parsed.data.completed,
  });

  logEvent("info", ctx, "task_progress_saved");
  revalidatePath("/dashboard");
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitOutcomeCheckinAction(formData: FormData) {
  const ctx = createRequestContext("dashboard.outcome_checkin");
  const user = await getCurrentUser();
  if (!user) {
    logEvent("warn", ctx, "unauthorized");
    throw new Error("Unauthorized");
  }

  const parsed = outcomeCheckinSchema.safeParse({
    assessmentId: getString(formData, "assessmentId"),
    projectsCompleted: getString(formData, "projectsCompleted"),
    interviewsStarted: getString(formData, "interviewsStarted") === "yes",
    notes: getString(formData, "notes"),
  });

  if (!parsed.success) {
    logEvent("warn", ctx, "validation_failed");
    throw new Error("Invalid outcome payload");
  }

  persistOutcomeCheckin(user.id, parsed.data);

  logEvent("info", ctx, "outcome_saved");
  revalidatePath("/dashboard");
}
