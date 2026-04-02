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
];

export default function PathsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Explore Tech Paths</h1>
            <p className="text-slate-400 mb-10">
            These are some of the directions PathFinder can help students explore.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
            {paths.map((path) => (
                <div
                key={path.name}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                >
                <h2 className="text-2xl font-semibold mb-3">{path.name}</h2>
                <p className="text-slate-400">{path.description}</p>
                </div>
            ))}
            </div>
        </div>
        </main>
    );
}