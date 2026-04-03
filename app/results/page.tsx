"use client";

import { useSearchParams } from "next/navigation";

export default function ResultsPage() {
    const params = useSearchParams();

    const name = params.get("name");
    const interest = params.get("interest");
    const goal = params.get("goal");

    function getRecommendation() {
        if (interest === "Web Development") {
        return "Frontend or Full-Stack Development";
        }
        if (interest === "Backend Development") {
        return "Backend Engineering";
        }
        if (interest === "Data Analytics") {
        return "Data Analytics / Data Science";
        }
        if (interest === "Cybersecurity") {
        return "Cybersecurity";
        }
        return "General Software Development";
    }

    const path = getRecommendation();

    return (
        <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-4">
            Your Path, {name} 🚀
            </h1>

            <p className="text-slate-400 mb-6">
            Based on your interest and goal, here is your recommended direction:
            </p>

            <div className="bg-slate-950 border border-slate-700 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-2">
                {path}
            </h2>
            <p className="text-slate-400">
                This path aligns with your interest in {interest} and your goal of {goal}.
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
        </div>
        </main>
    );
}