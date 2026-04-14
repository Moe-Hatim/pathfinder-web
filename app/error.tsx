"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("App route error", {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <main className="pf-shell px-6 py-12 text-white">
      <section className="pf-panel mx-auto max-w-2xl rounded-2xl p-8 text-center">
        <h1 className="mb-3 text-3xl font-bold">Something went wrong</h1>
        <p className="mb-4 text-slate-300">
          The app hit an unexpected error. You can try again or return home.
        </p>
        {error.digest ? (
          <p className="mb-6 text-xs text-slate-400">Error ID: {error.digest}</p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={reset} className="pf-btn-primary px-5 py-3">
            Try Again
          </button>
          <Link href="/" className="pf-btn-muted px-5 py-3 font-semibold text-white">
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}
