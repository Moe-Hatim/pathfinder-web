import Link from "next/link";
import { HoverLift, PageReveal, RiseIn, ScaleIn } from "@/components/ui/motion-primitives";

const paths = [
    {
        name: "Frontend Development",
        description: "Build websites and user interfaces people interact with.",
    },
    {
        name: "Backend Development",
        description: "Build servers, APIs, databases, and application logic.",
    },
    {
        name: "Data Analytics",
        description: "Work with data, insights, dashboards, and decision-making.",
    },
    {
        name: "Cybersecurity",
        description: "Protect systems, networks, and digital assets.",
    },
    {
        name: "UI/UX Design",
        description: "Design intuitive product experiences backed by user research.",
    },
    {
        name: "Mobile Development",
        description: "Build high-performance app experiences for Android and iOS.",
    },
];

export default function PathsPage() {
    return (
        <PageReveal className="pf-shell px-6 py-12 text-white">
        <div className="max-w-5xl mx-auto">
            <RiseIn>
              <h1 className="text-4xl font-bold mb-4">Explore Tech Paths</h1>
            </RiseIn>
            <p className="text-slate-400 mb-10">
            These are some of the directions PathFinder can help students explore.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
            {paths.map((path, index) => (
                <HoverLift key={path.name}>
                  <RiseIn
                    delay={0.06 * index}
                    className="pf-panel rounded-2xl p-6"
                  >
                    <h2 className="text-2xl font-semibold mb-3">{path.name}</h2>
                    <p className="text-slate-300">{path.description}</p>
                  </RiseIn>
                </HoverLift>
            ))}
            </div>

            <ScaleIn delay={0.14} className="pf-panel mt-10 rounded-2xl p-6">
              <h2 className="mb-2 text-2xl font-semibold">Need a personalized path?</h2>
              <p className="mb-4 text-slate-300">
                Take the assessment and get your top-fit recommendation with a 30/60/90-day roadmap.
              </p>
              <Link
                href="/assessment"
                className="pf-btn-primary inline-flex px-5 py-3"
              >
                Start Assessment
              </Link>
            </ScaleIn>
        </div>
        </PageReveal>
    );
}
