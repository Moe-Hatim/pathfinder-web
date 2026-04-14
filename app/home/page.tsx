import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-session";
import {
  getLatestAssessmentForUser,
  listAssessmentsForUser,
  listCompletedTasksForAssessment,
} from "@/lib/assessments";
import { PageReveal, RiseIn, ScaleIn } from "@/components/ui/motion-primitives";
import { Panel, PrimaryLinkButton, StatChip } from "@/components/ui/primitives";
import { PathfinderLogo } from "@/components/brand/pathfinder-logo";

export default async function AccountHomePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  const latest = await getLatestAssessmentForUser(user.id);
  const history = await listAssessmentsForUser(user.id);
  const completedTasks = latest
    ? (await listCompletedTasksForAssessment(user.id, latest.id)).length
    : 0;
  const weeklyTaskCount = latest?.recommendation.top.roadmap.thisWeek.length ?? 0;

  return (
    <PageReveal className="pf-shell px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-6">
        <ScaleIn>
          <Panel className="p-8">
            <PathfinderLogo compact className="mb-3" />
            <p className="mb-2 text-sm text-cyan-300">Account Home</p>
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="mt-3 text-slate-300">
              This is your command center for recommendations, progress, and weekly execution.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <StatChip>{history.length} assessments</StatChip>
              <StatChip tone="emerald">{completedTasks} tasks completed</StatChip>
              {latest ? (
                <StatChip tone="amber">{latest.recommendation.top.confidence}% confidence</StatChip>
              ) : null}
            </div>
          </Panel>
        </ScaleIn>

        <RiseIn delay={0.05}>
          <Panel className="p-8">
            <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <PrimaryLinkButton href="/assessment">Take Assessment</PrimaryLinkButton>
              <Link href="/results" className="pf-btn-muted px-5 py-3 font-semibold text-white">
                View Latest Results
              </Link>
              <Link href="/dashboard" className="pf-btn-muted px-5 py-3 font-semibold text-white">
                Open Dashboard
              </Link>
            </div>
          </Panel>
        </RiseIn>

        {latest ? (
          <RiseIn delay={0.1}>
            <Panel className="p-8">
              <h2 className="mb-3 text-xl font-semibold">Current Focus</h2>
              <p className="text-slate-300">
                Recommended path:{" "}
                <span className="font-semibold text-white">{latest.recommendation.top.title}</span>
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Score {latest.recommendation.top.score}% - Confidence{" "}
                {latest.recommendation.top.confidence}%
              </p>
              <div className="mt-5">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-300">
                  This Week
                </h3>
                <ul className="space-y-2">
                  {latest.recommendation.top.roadmap.thisWeek.slice(0, 3).map((task) => (
                    <li
                      key={task}
                      className="rounded-lg border border-slate-700 bg-slate-950/65 px-4 py-2 text-slate-200"
                    >
                      {task}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-slate-400">
                  {completedTasks} / {weeklyTaskCount} tasks completed.
                </p>
              </div>
            </Panel>
          </RiseIn>
        ) : (
          <RiseIn delay={0.1}>
            <Panel className="p-8 text-center">
              <h2 className="mb-3 text-2xl font-semibold">Start your first assessment</h2>
              <p className="mb-5 text-slate-300">
                We will generate your path recommendation and weekly roadmap once you complete the
                form.
              </p>
              <PrimaryLinkButton href="/assessment" className="inline-flex">
                Get Started
              </PrimaryLinkButton>
            </Panel>
          </RiseIn>
        )}
      </div>
    </PageReveal>
  );
}
