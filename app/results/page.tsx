import { getCurrentUser } from "@/lib/auth-session";
import {
  getAssessmentForUserById,
  getFeedbackForAssessment,
  getLatestAssessmentForUser,
} from "@/lib/assessments";
import { HoverLift, PageReveal, RiseIn, ScaleIn } from "@/components/ui/motion-primitives";
import { FeedbackPanel } from "@/app/results/feedback-panel";
import { Panel, PrimaryLinkButton, SectionTitle, StatChip } from "@/components/ui/primitives";
import { ConfidenceMeter } from "@/app/results/confidence-meter";

function ScoreBadge({ value }: { value: number }) {
  return <StatChip>{value}% fit</StatChip>;
}

function ConfidenceBadge({ value }: { value: number }) {
  return <StatChip tone="emerald">{value}% confidence</StatChip>;
}

type ResultsPageProps = {
  searchParams: Promise<{ assessmentId?: string }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const user = await getCurrentUser();
  if (!user) {
    return (
      <PageReveal className="pf-shell px-6 py-12 text-white">
        <Panel className="mx-auto max-w-2xl p-8 text-center">
          <h1 className="mb-3 text-3xl font-bold">Log in to view results</h1>
          <p className="mb-6 text-slate-300">
            Your recommendations are saved per account.
          </p>
          <PrimaryLinkButton href="/auth/login" className="inline-flex">
            Log In
          </PrimaryLinkButton>
        </Panel>
      </PageReveal>
    );
  }

  const latest = await getLatestAssessmentForUser(user.id);
  const selectedAssessment =
    params.assessmentId && params.assessmentId.length > 0
      ? await getAssessmentForUserById(user.id, params.assessmentId)
      : null;
  const activeAssessment = selectedAssessment ?? latest;

  if (!activeAssessment) {
    return (
      <PageReveal className="pf-shell px-6 py-12 text-white">
        <Panel className="mx-auto max-w-2xl p-8 text-center">
          <h1 className="mb-3 text-3xl font-bold">No assessment found</h1>
          <p className="mb-6 text-slate-300">
            Start your assessment to get a personalized recommendation and roadmap.
          </p>
          <PrimaryLinkButton href="/assessment" className="inline-flex">
            Start Assessment
          </PrimaryLinkButton>
        </Panel>
      </PageReveal>
    );
  }

  const { assessment, recommendation } = activeAssessment;
  const feedback = await getFeedbackForAssessment(user.id, activeAssessment.id);
  const scoreBreakdown = recommendation.top.scoreBreakdown ?? [];
  const lowConfidence = recommendation.top.confidence < 65;
  const dualTrackOption = recommendation.alternatives[0] ?? null;

  return (
    <PageReveal className="pf-shell px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <ScaleIn className="pf-panel rounded-2xl p-8">
          <p className="mb-2 text-sm text-cyan-400">Personalized Recommendation</p>
          <SectionTitle
            className="mb-4"
            title={`${assessment.name}, your best path is ${recommendation.top.title}`}
          />
          <div className="mb-4 flex flex-wrap gap-3">
            <ScoreBadge value={recommendation.top.score} />
            <ConfidenceBadge value={recommendation.top.confidence} />
          </div>
          <p className="text-slate-300">{recommendation.top.reason}</p>
          <div className="mt-5">
            <ConfidenceMeter value={recommendation.top.confidence} />
          </div>
        </ScaleIn>

        {lowConfidence && dualTrackOption ? (
          <RiseIn delay={0.04} className="pf-panel rounded-2xl border border-amber-600/50 bg-amber-900/20 p-8">
            <h2 className="mb-3 text-2xl font-semibold text-amber-200">Dual-track recommendation</h2>
            <p className="mb-4 text-amber-100/90">
              Confidence is still early, so we suggest running two paths in parallel before
              committing fully.
            </p>
            <div className="flex flex-wrap gap-3">
              <StatChip tone="emerald">{recommendation.top.title}</StatChip>
              <StatChip tone="amber">{dualTrackOption.title}</StatChip>
            </div>
          </RiseIn>
        ) : null}

        <RiseIn delay={0.05} className="pf-panel rounded-2xl p-8">
          <h2 className="mb-4 text-2xl font-semibold">Start This Week</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-300">
            {recommendation.top.roadmap.thisWeek.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </RiseIn>

        <RiseIn delay={0.08} className="pf-panel rounded-2xl p-8">
          <h2 className="mb-4 text-2xl font-semibold">Why this path?</h2>
          <p className="mb-5 text-slate-300">
            The bars below show how each factor contributed to this recommendation.
          </p>
          <div className="space-y-4">
            {scoreBreakdown.length === 0 ? (
              <p className="text-sm text-slate-400">
                This recommendation was generated before score breakdowns were enabled.
              </p>
            ) : null}
            {scoreBreakdown.map((item) => (
              <div key={item.factor} className="rounded-xl border border-slate-700 bg-slate-950/65 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">{item.factor}</p>
                  <div className="flex items-center gap-2">
                    <StatChip tone="cyan">{item.impact}% impact</StatChip>
                    <StatChip tone={item.points >= 0 ? "emerald" : "amber"}>
                      {item.points >= 0 ? `+${item.points}` : item.points} pts
                    </StatChip>
                  </div>
                </div>
                <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-cyan-400" style={{ width: `${item.impact}%` }} />
                </div>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </RiseIn>

        <section className="grid gap-6 md:grid-cols-3">
          <HoverLift>
            <div className="pf-panel rounded-2xl p-6">
            <h3 className="mb-3 text-lg font-semibold">30 Days</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              {recommendation.top.roadmap.days30.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            </div>
          </HoverLift>
          <HoverLift>
            <div className="pf-panel rounded-2xl p-6">
            <h3 className="mb-3 text-lg font-semibold">60 Days</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              {recommendation.top.roadmap.days60.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            </div>
          </HoverLift>
          <HoverLift>
            <div className="pf-panel rounded-2xl p-6">
            <h3 className="mb-3 text-lg font-semibold">90 Days</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              {recommendation.top.roadmap.days90.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            </div>
          </HoverLift>
        </section>

        <RiseIn delay={0.1} className="pf-panel rounded-2xl p-8">
          <h2 className="mb-4 text-2xl font-semibold">Alternative Paths</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendation.alternatives.map((option) => (
              <HoverLift key={option.title}>
                <article className="rounded-xl border border-slate-700 bg-slate-950/65 p-5">
                  <h3 className="mb-2 text-lg font-semibold">{option.title}</h3>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <ScoreBadge value={option.score} />
                    <ConfidenceBadge value={option.confidence} />
                  </div>
                  <p className="text-sm text-slate-300">{option.reason}</p>
                </article>
              </HoverLift>
            ))}
          </div>
        </RiseIn>

        <RiseIn delay={0.14}>
          <FeedbackPanel assessmentId={activeAssessment.id} initialFeedback={feedback} />
        </RiseIn>

        <section className="rounded-2xl border border-yellow-700 bg-yellow-900/20 p-6 backdrop-blur">
          <p className="text-sm text-yellow-300">
            Keep focus tight for at least 4 weeks before switching directions. Depth creates
            momentum faster than constant context switching.
          </p>
          <div className="mt-4">
            <PrimaryLinkButton href="/dashboard" className="inline-flex px-4 py-2">
              Track Weekly Progress
            </PrimaryLinkButton>
          </div>
        </section>
      </div>

      <div className="pf-sticky-cta md:hidden">
        <PrimaryLinkButton href="/dashboard" className="inline-flex w-full justify-center py-3 text-base">
          Track Weekly Progress
        </PrimaryLinkButton>
      </div>
    </PageReveal>
  );
}
