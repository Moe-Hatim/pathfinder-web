"use client";

import { useSearchParams } from "next/navigation";

export default function ResultsPage() {
    const params = useSearchParams();

    const name = params.get("name");
    const interest = params.get("interest");
    const goal = params.get("goal");

    function getRecommendation() {
        if (interest === "Web Development") {
            if (goal === "Freelancing") return "Frontend Development";
            if (goal === "Startup") return "Full-Stack Development";
            return "Frontend Development";
        }

        if (interest === "Backend Development") {
            if (goal === "Job") return "Backend Engineering";
            if (goal === "Startup") return "Full-Stack Development";
            return "Backend Engineering";
        }

        if (interest === "Data Analytics") {
            return "Data Analytics / Data Science";
        }

        if (interest === "Cybersecurity") {
            return "Cybersecurity";
        }

        if (interest === "Mobile Development") {
            return "Mobile App Development";
        }

        if (interest === "UI/UX Design") {
            return "UI/UX Design";
        }

        return "General Software Development";
    }

    const path = getRecommendation();

    return (
        <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-4">
            {name}, here’s your recommended path 🚀
            </h1>

            <p className="text-slate-400 mb-6">
            here is your recommended direction:
            </p>

            <div className="bg-slate-950 border border-slate-700 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-2">
                {path}
            </h2>
            <p className="text-slate-400 mt-3">
            This is based on your interest in <strong>{interest}</strong> and your goal of <strong>{goal}</strong>.
            </p>
            </div>

            <div>
            <h3 className="text-xl font-semibold mb-3">Next Steps</h3>
            <ul className="list-disc list-inside text-slate-400 space-y-2">
                <li>Focus on core fundamentals</li>
                <li>Build 2–3 small projects</li>
                <li>Learn Git and GitHub</li>
                <li>Start sharing your work</li>
            </ul>
            </div>

            <div className="mt-8 bg-yellow-900/20 border border-yellow-700 rounded-xl p-4">
            <p className="text-yellow-300 text-sm">
                ⚠️ Avoid learning too many things at once. Focus on this path for the next few weeks before exploring others.
            </p>
            </div>
            
        </div>
        </main>
    );
}