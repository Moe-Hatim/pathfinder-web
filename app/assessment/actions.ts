"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-session";
import { createAssessmentRecord } from "@/lib/assessments";
import { assessmentSchema } from "@/features/assessment/schemas";
import { generatePersonalizedRecommendation } from "@/features/recommendation/service";
import { createRequestContext, logEvent } from "@/features/shared/observability";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitAssessment(formData: FormData) {
  const ctx = createRequestContext("assessment.submit");
  const user = await getCurrentUser();
  if (!user) {
    logEvent("warn", ctx, "unauthorized");
    redirect("/auth/login");
  }

  const parsed = assessmentSchema.safeParse({
    name: getString(formData, "name"),
    field: getString(formData, "field"),
    goal: getString(formData, "goal"),
    interest: getString(formData, "interest"),
    level: getString(formData, "level"),
    hoursPerWeek: getString(formData, "hoursPerWeek"),
    workStyle: getString(formData, "workStyle"),
    mathComfort: getString(formData, "mathComfort"),
    thinkingStyle: getString(formData, "thinkingStyle"),
    timelineUrgency: getString(formData, "timelineUrgency"),
  });

  if (!parsed.success) {
    logEvent("warn", ctx, "validation_failed");
    redirect("/assessment");
  }

  const assessment = parsed.data;
  const recommendation = await generatePersonalizedRecommendation(assessment);

  await createAssessmentRecord({
    userId: user.id,
    assessment,
    recommendation,
  });

  logEvent("info", ctx, "assessment_saved");
  redirect("/results");
}
