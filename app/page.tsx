import { getCurrentUser } from "@/lib/auth-session";
import { HoverLift, PageReveal, RiseIn, ScaleIn } from "@/components/ui/motion-primitives";
import { PathfinderLogo } from "@/components/brand/pathfinder-logo";
import {
  Card,
  PrimaryLinkButton,
  SectionHeader,
  StatChip,
} from "@/components/ui/primitives";

const features = [
  {
    title: "AI-Powered Career Matching",
    description:
      "Get explainable recommendations based on your goals, strengths, timeline, and learning preferences.",
  },
  {
    title: "Execution-First Roadmaps",
    description:
      "Receive practical 30/60/90-day plans and weekly tasks so you can ship progress, not just consume content.",
  },
  {
    title: "Continuous Improvement Loop",
    description:
      "Track outcomes, submit feedback, and refine recommendations as your profile evolves.",
  },
];

const startupMetrics = [
  { label: "Career Paths", value: "7+" },
  { label: "Guided Stages", value: "90 Days" },
  { label: "Assessment Factors", value: "10" },
];

export default async function LandingPage() {
  const user = await getCurrentUser();

  return (
    <PageReveal className="pf-shell text-white">
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative mx-auto max-w-6xl">
          <RiseIn className="mb-14 flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <PathfinderLogo />
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Find your direction and execute with confidence.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                PathFinder combines recommendation intelligence with execution systems so every
                student knows what to do next and why it matters.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <StatChip>Explainable scoring</StatChip>
                <StatChip tone="emerald">Weekly milestones</StatChip>
                <StatChip tone="amber">Outcome check-ins</StatChip>
              </div>
            </div>

            {user ? (
              <div className="flex flex-wrap items-center gap-3">
                <PrimaryLinkButton href="/home">Go To My Home</PrimaryLinkButton>
                <PrimaryLinkButton href="/dashboard">Dashboard</PrimaryLinkButton>
              </div>
            ) : null}
          </RiseIn>

          <ScaleIn delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-3">
              {startupMetrics.map((metric) => (
                <Card key={metric.label} className="p-6 text-center">
                  <p className="text-3xl font-black text-cyan-300">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{metric.label}</p>
                </Card>
              ))}
            </div>
          </ScaleIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <SectionHeader
          eyebrow="Why PathFinder"
          title="From uncertainty to outcomes"
          subtitle="Designed like a product company onboarding flow: clear, measurable, and iterative."
          className="mb-8"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <HoverLift key={feature.title}>
              <RiseIn delay={0.08 + index * 0.08}>
                <Card className="h-full p-7">
                  <h2 className="mb-3 text-xl font-semibold">{feature.title}</h2>
                  <p className="text-slate-300">{feature.description}</p>
                </Card>
              </RiseIn>
            </HoverLift>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <ScaleIn delay={0.2}>
          <Card className="p-8 text-center">
            <SectionHeader
              className="mb-6"
              title="Ready to launch your tech career plan?"
              subtitle="Create your account, complete assessment, and get your personalized roadmap."
            />
            <div className="flex flex-wrap items-center justify-center gap-4">
              {user ? (
                <PrimaryLinkButton href="/home">Open My Home</PrimaryLinkButton>
              ) : (
                <PrimaryLinkButton href="/assessment">Try Assessment Preview</PrimaryLinkButton>
              )}
            </div>
          </Card>
        </ScaleIn>
      </section>
    </PageReveal>
  );
}
