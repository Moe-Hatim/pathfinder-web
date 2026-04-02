import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <section className="max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400 mb-4">
          PathFinder
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Find your direction in tech
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          PathFinder helps tech students discover the right specialization,
          connect skills to careers, and follow a practical learning path.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
  <Link
    href="/paths"
    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-3 rounded-xl transition"
  >
    Get Started
  </Link>

  <Link
    href="/paths"
    className="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-xl transition"
  >
    Explore Paths
  </Link>
</div>
      </section>

      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Discover Yourself</h2>
          <p className="text-slate-400">
            Understand your strengths, interests, and what kind of tech path
            fits you best.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Choose a Path</h2>
          <p className="text-slate-400">
            Explore areas like frontend, backend, data, cybersecurity, mobile,
            and more.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Take Action</h2>
          <p className="text-slate-400">
            Follow simple roadmaps and practical next steps to move forward with
            confidence.
          </p>
        </div>
      </section>
    </main>
  );
}