import Link from "next/link";
import { forgotPasswordAction } from "@/app/auth/actions";
import { PageReveal, ScaleIn } from "@/components/ui/motion-primitives";

type ForgotPasswordPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function ForgotPasswordPage({ searchParams }: ForgotPasswordPageProps) {
  const params = await searchParams;
  const isSent = params.status === "sent";
  const notConfigured = params.status === "delivery_not_configured";
  const deliveryFailed = params.status === "delivery_failed";

  return (
    <PageReveal className="pf-shell px-6 py-12 text-white">
      <ScaleIn className="pf-panel mx-auto max-w-md rounded-2xl p-8">
        <h1 className="mb-2 text-3xl font-bold">Reset your password</h1>
        <p className="mb-6 text-slate-300">
          Enter your email and we will send you a secure reset link.
        </p>

        {isSent ? (
          <p className="mb-4 rounded-lg border border-emerald-700 bg-emerald-900/25 px-3 py-2 text-sm text-emerald-300">
            If the email exists, a reset link has been sent.
          </p>
        ) : null}

        {notConfigured ? (
          <p className="mb-4 rounded-lg border border-amber-700 bg-amber-900/25 px-3 py-2 text-sm text-amber-300">
            Email delivery is not configured yet. Check server logs for the reset link and set SMTP
            or Resend env variables.
          </p>
        ) : null}

        {deliveryFailed ? (
          <p className="mb-4 rounded-lg border border-red-700 bg-red-900/30 px-3 py-2 text-sm text-red-300">
            We could not send the reset email right now. Please verify email provider settings and
            try again.
          </p>
        ) : null}

        <form action={forgotPasswordAction} className="space-y-4">
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

          <button type="submit" className="pf-btn-primary w-full py-3">
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Remembered it?{" "}
          <Link href="/auth/login" className="text-cyan-300 hover:text-cyan-200">
            Back to login
          </Link>
        </p>
      </ScaleIn>
    </PageReveal>
  );
}
