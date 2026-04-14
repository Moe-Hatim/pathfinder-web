import "server-only";

import { generateRecommendations, type AssessmentInput } from "@/lib/recommendation";
import { getAdaptivePathBias } from "@/lib/assessments";

export async function generatePersonalizedRecommendation(assessment: AssessmentInput) {
  const adaptivePathBias = await getAdaptivePathBias();
  return generateRecommendations(assessment, { adaptivePathBias });
}
