import Link from "next/link";
import { TaskChecklist } from "@/app/dashboard/task-checklist";
import { getCurrentUser } from "@/lib/auth-session";
import {
  getLatestAssessmentForUser,
  listAssessmentsForUser,
  listCompletedTasksForAssessment,
  getOutcomeCheckinForAssessment,
  getAssessmentAgeInDays,
} from "@/lib/assessments";
import { PageReveal, RiseIn, ScaleIn } from "@/components/ui/motion-primitives";
import { OutcomeCheckinPanel } from "@/app/dashboard/outcome-checkin";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <PageReveal className="pf-shell px-6 py-12 text-white">
        <div className="pf-panel mx-auto max-w-2xl rounded-2xl p-8 text-center">
          <h1 className="mb-3 text-3xl font-bold">Log in to access your dashboard</h1>
          <p className="mb-6 text-slate-300">
            Track roadmap progress and keep all your assessments in one place.
          </p>
          <Link href="/auth/login" className="pf-btn-primary inline-flex px-5 py-3">
            Log In
          </Link>
        </div>
      </PageReveal>
    );
  }

  const latest = getLatestAssessmentForUser(user.id);
  const history = listAssessmentsForUser(user.id);

  if (!latest) {
    return (
      <PageReveal className="pf-shell px-6 py-12 text-white">
        <div className="pf-panel mx-auto max-w-2xl rounded-2xl p-8 text-center">
          <h1 className="mb-3 text-3xl font-bold">Your dashboard is waiting</h1>
          <p className="mb-6 text-slate-300">
            Complete the assessment first, then we will track your roadmap progress here.
          </p>
          <Link href="/assessment" className="pf-btn-primary inline-flex px-5 py-3">
            Start Assessment
          </Link>
        </div>
      </PageReveal>
    );
  }

  const { recommendation } = latest;
  const completedTasks = listCompletedTasksForAssessment(user.id, latest.id);
  const outcome = getOutcomeCheckinForAssessment(user.id, latest.id);
  const ageInDays = getAssessmentAgeInDays(latest.id);
  const showOutcomePrompt = ageInDays >= 14;

  return (
    <PageReveal className="pf-shell px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <ScaleIn className="pf-panel rounded-2xl p-8">
          <p className="mb-2 text-sm text-cyan-400">Progress Dashboard</p>
          <h1 className="mb-2 text-3xl font-bold">Welcome back, {user.name}</h1>
          <p className="text-slate-300">
            Primary path: <span className="font-semibold text-white">{recommendation.top.title}</span>
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Saved assessments: {history.length}
          </p>
        </ScaleIn>

        <RiseIn delay={0.05}>
          <TaskChecklist
            assessmentId={latest.id}
            tasks={recommendation.top.roadmap.thisWeek}
            initialCompletedTasks={completedTasks}
          />
        </RiseIn>

        <RiseIn delay={0.12} className="pf-panel rounded-2xl p-8">
          <h2 className="mb-3 text-xl font-semibold">Keep your momentum</h2>
          <p className="mb-4 text-slate-300">
            Focus on consistency. Finish this week&apos;s checklist before switching paths.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/results"
              className="pf-btn-muted px-4 py-2 font-medium text-white"
            >
              View Recommendation
            </Link>
            <Link
              href="/assessment"
              className="pf-btn-muted px-4 py-2 font-medium text-white"
            >
              Retake Assessment
            </Link>
          </div>
        </RiseIn>

        <RiseIn delay={0.17} className="pf-panel rounded-2xl p-8">
          <h2 className="mb-4 text-xl font-semibold">Assessment History</h2>
          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-white">
                    #{history.length - index} {item.recommendation.top.title}
                  </p>
                  <p className="text-sm text-slate-400">
                    {new Date(item.createdAt).toLocaleString()} • {item.recommendation.top.score}% fit
                  </p>
                </div>
                <Link
                  href={`/results?assessmentId=${encodeURIComponent(item.id)}`}
                  className="pf-btn-muted px-3 py-2 text-sm font-medium text-white"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </RiseIn>

        {showOutcomePrompt ? (
          <RiseIn delay={0.2}>
            <OutcomeCheckinPanel assessmentId={latest.id} existing={outcome} />
          </RiseIn>
        ) : (
          <RiseIn delay={0.2} className="pf-panel rounded-2xl p-8">
            <h2 className="mb-2 text-xl font-semibold">Outcome Check-in</h2>
            <p className="text-slate-300">
              We will ask your progress check-in after 2 weeks. Come back in{" "}
              <span className="font-semibold text-white">{Math.max(0, 14 - ageInDays)} day(s)</span>.
            </p>
          </RiseIn>
        )}
      </div>
    </PageReveal>
  );
}
