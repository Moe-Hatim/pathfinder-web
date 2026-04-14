import { z } from "zod";
import { PERSONAL_INTERESTS, STUDY_FIELDS } from "@/lib/assessment-options";

export const assessmentSchema = z.object({
  name: z.string().trim().min(2).max(80),
  field: z.enum(STUDY_FIELDS),
  goal: z.enum(["Internship", "Freelancing", "Job", "Startup", "Clarity"]),
  interest: z.enum(PERSONAL_INTERESTS),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  hoursPerWeek: z.coerce.number().int().min(1).max(40),
  workStyle: z.enum(["Solo", "Team", "Balanced"]),
  mathComfort: z.enum(["Low", "Medium", "High"]),
  thinkingStyle: z.enum(["Creative", "Systems", "Balanced"]),
  timelineUrgency: z.enum(["Immediate", "1-3 Months", "3-6 Months", "Flexible"]),
});

export type AssessmentFormInput = z.infer<typeof assessmentSchema>;
