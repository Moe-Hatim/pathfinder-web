import "server-only";

import { generateRecommendations, type AssessmentInput } from "@/lib/recommendation";
import { getAdaptivePathBias } from "@/lib/assessments";

export function generatePersonalizedRecommendation(assessment: AssessmentInput) {
  const adaptivePathBias = getAdaptivePathBias();
  return generateRecommendations(assessment, { adaptivePathBias });
}
