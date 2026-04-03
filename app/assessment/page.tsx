"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const interests = [
    "Web Development",
    "Backend Development",
    "Data Analytics",
    "Cybersecurity",
    "Mobile Development",
    "UI/UX Design",
];

export default function AssessmentPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [field, setField] = useState("");
    const [goal, setGoal] = useState("");
    const [interest, setInterest] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const query = `?name=${encodeURIComponent(name)}&field=${encodeURIComponent(field)}&goal=${encodeURIComponent(goal)}&interest=${encodeURIComponent(interest)}`;

        router.push("/results" + query);
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-3">Student Assessment</h1>
            <p className="text-slate-400 mb-8">
            Tell PathFinder a little about yourself so it can guide you better.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block mb-2 text-sm text-slate-300">
                Your Name
                </label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
                placeholder="Enter your name"
                required
                />
            </div>

            <div>
                <label className="block mb-2 text-sm text-slate-300">
                What are you studying?
                </label>
                <input
                type="text"
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
                placeholder="e.g. CS, IT, Software Engineering"
                required
                />
            </div>

            <div>
                <label className="block mb-2 text-sm text-slate-300">
                What is your main goal?
                </label>
                <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
                required
                >
                <option value="">Select a goal</option>
                <option value="Internship">Get an internship</option>
                <option value="Freelancing">Start freelancing</option>
                <option value="Job">Prepare for a job</option>
                <option value="Startup">Build a startup</option>
                <option value="Clarity">Gain direction and clarity</option>
                </select>
            </div>

            <div>
                <label className="block mb-2 text-sm text-slate-300">
                Which area interests you most?
                </label>
                <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
                required
                >
                <option value="">Choose an area</option>
                {interests.map((item) => (
                    <option key={item} value={item}>
                    {item}
                    </option>
                ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-3 rounded-xl transition"
            >
                Submit Assessment
            </button>
            </form>
        </div>
        </main>
    );
}