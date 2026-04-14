import Link from "next/link";
import { signupAction } from "@/app/auth/actions";
import { PageReveal, ScaleIn } from "@/components/ui/motion-primitives";

type SignupPageProps = {
  searchParams: Promise<{ error?: string }>;
};

function getErrorMessage(error: string | undefined) {
  if (error === "email_exists") {
    return "An account with this email already exists.";
  }
  if (error === "invalid_input") {
    return "Please fill all fields and use a password with at least 8 characters.";
  }
  return null;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const errorMessage = getErrorMessage(params.error);

  return (
    <PageReveal className="pf-shell px-6 py-12 text-white">
      <ScaleIn className="pf-panel mx-auto max-w-md rounded-2xl p-8">
        <h1 className="mb-2 text-3xl font-bold">Create your PathFinder account</h1>
        <p className="mb-6 text-slate-300">
          Save your assessments and keep your roadmap progress in one place.
        </p>

        {errorMessage ? (
          <p className="mb-4 rounded-lg border border-red-700 bg-red-900/30 px-3 py-2 text-sm text-red-300">
            {errorMessage}
          </p>
        ) : null}

        <form action={signupAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-slate-200">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-slate-200">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
            />
          </div>

          <button
            type="submit"
            className="pf-btn-primary w-full py-3"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-cyan-300 hover:text-cyan-200">
            Log in
          </Link>
        </p>
      </ScaleIn>
    </PageReveal>
  );
}
