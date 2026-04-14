import Link from "next/link";
import { resetPasswordAction } from "@/app/auth/actions";
import { PageReveal, ScaleIn } from "@/components/ui/motion-primitives";

type ResetPasswordPageProps = {
  searchParams: Promise<{ token?: string; error?: string }>;
};

function getErrorMessage(error: string | undefined) {
  if (error === "invalid_or_expired") {
    return "This reset link is invalid or expired. Please request a new one.";
  }
  if (error === "invalid_input") {
    return "Please enter a valid password and confirm it correctly.";
  }
  return null;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;
  const token = params.token ?? "";
  const errorMessage = getErrorMessage(params.error);

  if (!token) {
    return (
      <PageReveal className="pf-shell px-6 py-12 text-white">
        <ScaleIn className="pf-panel mx-auto max-w-md rounded-2xl p-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Reset link missing</h1>
          <p className="mb-6 text-slate-300">
            This page needs a valid reset link from your email.
          </p>
          <Link href="/auth/forgot-password" className="pf-btn-primary inline-flex px-5 py-3">
            Request new reset link
          </Link>
        </ScaleIn>
      </PageReveal>
    );
  }

  return (
    <PageReveal className="pf-shell px-6 py-12 text-white">
      <ScaleIn className="pf-panel mx-auto max-w-md rounded-2xl p-8">
        <h1 className="mb-2 text-3xl font-bold">Set new password</h1>
        <p className="mb-6 text-slate-300">Choose a strong password with at least 8 characters.</p>

        {errorMessage ? (
          <p className="mb-4 rounded-lg border border-red-700 bg-red-900/30 px-3 py-2 text-sm text-red-300">
            {errorMessage}
          </p>
        ) : null}

        <form action={resetPasswordAction} className="space-y-4">
          <input type="hidden" name="token" value={token} />

          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-slate-200">
              New Password
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

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm text-slate-200">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
            />
          </div>

          <button type="submit" className="pf-btn-primary w-full py-3">
            Update Password
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Back to{" "}
          <Link href="/auth/login" className="text-cyan-300 hover:text-cyan-200">
            login
          </Link>
        </p>
      </ScaleIn>
    </PageReveal>
  );
}
