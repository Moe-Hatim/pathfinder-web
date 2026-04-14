import Link from "next/link";
import { submitAssessment } from "@/app/assessment/actions";
import { getCurrentUser } from "@/lib/auth-session";
import { PERSONAL_INTERESTS, STUDY_FIELDS } from "@/lib/assessment-options";
import { PageReveal, RiseIn, ScaleIn } from "@/components/ui/motion-primitives";
import { MutedLinkButton, Panel, PrimaryLinkButton, SectionTitle } from "@/components/ui/primitives";

const goals = ["Internship", "Freelancing", "Job", "Startup", "Clarity"] as const;
const levels = ["Beginner", "Intermediate", "Advanced"] as const;
const workStyles = ["Solo", "Team", "Balanced"] as const;
const mathComfortLevels = ["Low", "Medium", "High"] as const;
const thinkingStyles = ["Creative", "Systems", "Balanced"] as const;
const timelineUrgencies = ["Immediate", "1-3 Months", "3-6 Months", "Flexible"] as const;

export default async function AssessmentPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <PageReveal className="pf-shell px-6 py-12 text-white">
        <Panel className="mx-auto max-w-2xl p-8 text-center">
          <h1 className="mb-3 text-3xl font-bold">Create an account to start</h1>
          <p className="mb-6 text-slate-300">
            Your assessment and roadmap are saved securely to your account.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <PrimaryLinkButton href="/auth/signup">Create Account</PrimaryLinkButton>
            <MutedLinkButton href="/auth/login" className="px-5 py-3 font-semibold">
              Log In
            </MutedLinkButton>
          </div>
        </Panel>
      </PageReveal>
    );
  }

  return (
    <PageReveal className="pf-shell px-6 py-12 text-white">
      <ScaleIn className="mx-auto max-w-3xl">
        <Panel className="p-8">
        <RiseIn>
          <p className="mb-2 text-sm text-cyan-400">Step 1 of 2</p>
        </RiseIn>
        <SectionTitle
          className="mb-8"
          title="Student Assessment"
          subtitle="Tell PathFinder about your goals and current stage. Your data is submitted securely and is not exposed in the URL."
        />

        <form id="assessmentForm" action={submitAssessment} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-slate-200">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
              placeholder="Enter your name"
              autoComplete="name"
              defaultValue={user.name}
              required
            />
          </div>

          <div>
            <label htmlFor="field" className="mb-2 block text-sm text-slate-200">
              What are you studying?
            </label>
            <select
              id="field"
              name="field"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select your current study program
              </option>
              {STUDY_FIELDS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-slate-400">
              This field now directly influences your recommendation score and roadmap focus.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="goal" className="mb-2 block text-sm text-slate-200">
                What is your main goal?
              </label>
              <select
                id="goal"
                name="goal"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a goal
                </option>
                {goals.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="interest" className="mb-2 block text-sm text-slate-200">
                What do you naturally enjoy doing most?
              </label>
              <select
                id="interest"
                name="interest"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Choose your strongest personal interest
                </option>
                {PERSONAL_INTERESTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-5">
            <p className="mb-4 text-sm font-semibold tracking-wide text-cyan-300">
              Calibration Questions
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="workStyle" className="mb-2 block text-sm text-slate-200">
                  Preferred work style
                </label>
                <select
                  id="workStyle"
                  name="workStyle"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
                  defaultValue="Balanced"
                  required
                >
                  {workStyles.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mathComfort" className="mb-2 block text-sm text-slate-200">
                  Math comfort
                </label>
                <select
                  id="mathComfort"
                  name="mathComfort"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
                  defaultValue="Medium"
                  required
                >
                  {mathComfortLevels.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="thinkingStyle" className="mb-2 block text-sm text-slate-200">
                  Thinking style
                </label>
                <select
                  id="thinkingStyle"
                  name="thinkingStyle"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
                  defaultValue="Balanced"
                  required
                >
                  {thinkingStyles.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="timelineUrgency" className="mb-2 block text-sm text-slate-200">
                  Timeline urgency
                </label>
                <select
                  id="timelineUrgency"
                  name="timelineUrgency"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
                  defaultValue="3-6 Months"
                  required
                >
                  {timelineUrgencies.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="level" className="mb-2 block text-sm text-slate-200">
                Current experience level
              </label>
              <select
                id="level"
                name="level"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
                defaultValue="Beginner"
                required
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hoursPerWeek" className="mb-2 block text-sm text-slate-200">
                Hours available each week
              </label>
              <input
                id="hoursPerWeek"
                name="hoursPerWeek"
                type="number"
                min={1}
                max={40}
                defaultValue={6}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="pf-btn-primary hidden w-full py-3 md:inline-flex md:justify-center"
          >
            Generate My Recommendation
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Want to explore first?{" "}
          <Link href="/paths" className="text-cyan-300 hover:text-cyan-200">
            View all paths
          </Link>
        </div>

        <div className="pf-sticky-cta md:hidden">
          <button
            type="submit"
            form="assessmentForm"
            className="pf-btn-primary pf-focus-ring inline-flex w-full justify-center py-3 text-base"
          >
            Generate My Recommendation
          </button>
        </div>
        </Panel>
      </ScaleIn>
    </PageReveal>
  );
}
