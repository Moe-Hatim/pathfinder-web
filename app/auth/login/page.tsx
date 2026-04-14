import Link from "next/link";
import { loginAction } from "@/app/auth/actions";
import { PageReveal, ScaleIn } from "@/components/ui/motion-primitives";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; status?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params.error === "invalid_credentials";
  const resetSuccess = params.status === "password_reset_success";

  return (
    <PageReveal className="pf-shell px-6 py-12 text-white">
      <ScaleIn className="pf-panel mx-auto max-w-md rounded-2xl p-8">
        <h1 className="mb-2 text-3xl font-bold">Log in to PathFinder</h1>
        <p className="mb-6 text-slate-300">Continue your roadmap and track your progress.</p>

        {hasError ? (
          <p className="mb-4 rounded-lg border border-red-700 bg-red-900/30 px-3 py-2 text-sm text-red-300">
            Invalid email or password.
          </p>
        ) : null}

        {resetSuccess ? (
          <p className="mb-4 rounded-lg border border-emerald-700 bg-emerald-900/25 px-3 py-2 text-sm text-emerald-300">
            Password reset successful. Please log in with your new password.
          </p>
        ) : null}

        <form action={loginAction} className="space-y-4">
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
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
            />
            <div className="mt-2 text-right">
              <Link href="/auth/forgot-password" className="text-xs text-cyan-300 hover:text-cyan-200">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="pf-btn-primary w-full py-3"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          No account yet?{" "}
          <Link href="/auth/signup" className="text-cyan-300 hover:text-cyan-200">
            Create one
          </Link>
        </p>
      </ScaleIn>
    </PageReveal>
  );
}
