"use client";

import { useState, useTransition } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { submitRecommendationFeedbackAction } from "@/app/results/actions";
import type { RecommendationFeedback } from "@/lib/assessments";
import { Button } from "@/components/ui/primitives";

type FeedbackPanelProps = {
  assessmentId: string;
  initialFeedback: RecommendationFeedback | null;
};

export function FeedbackPanel({ assessmentId, initialFeedback }: FeedbackPanelProps) {
  const [helpful, setHelpful] = useState<boolean | null>(initialFeedback?.helpful ?? null);
  const [reason, setReason] = useState(initialFeedback?.reason ?? "");
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const reduceMotion = useReducedMotion();

  function save() {
    if (helpful === null) {
      return;
    }

    startTransition(async () => {
      await submitRecommendationFeedbackAction({
        assessmentId,
        helpful,
        reason,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <section className="pf-panel rounded-2xl p-6">
      <h2 className="mb-2 text-xl font-semibold">Was this recommendation helpful?</h2>
      <p className="mb-4 text-sm text-slate-300">
        Your feedback helps us improve recommendation quality.
      </p>

      <div className="mb-4 flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => setHelpful(true)}
          variant={helpful === true ? "primary" : "muted"}
          className={
            helpful === true
              ? "px-4 py-2"
              : "px-4 py-2 font-medium"
          }
        >
          Yes, helpful
        </Button>
        <Button
          type="button"
          onClick={() => setHelpful(false)}
          variant={helpful === false ? "primary" : "muted"}
          className={
            helpful === false
              ? "px-4 py-2"
              : "px-4 py-2 font-medium"
          }
        >
          Not really
        </Button>
      </div>

      <label htmlFor="feedbackReason" className="mb-2 block text-sm text-slate-200">
        Optional reason
      </label>
      <textarea
        id="feedbackReason"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        rows={3}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none ring-cyan-400/40 transition focus:ring-2"
        placeholder="Tell us what felt accurate or what was missing..."
      />

      <div className="mt-4 flex items-center gap-3">
        <Button
          type="button"
          onClick={save}
          disabled={helpful === null || isPending}
          className="px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Feedback"}
        </Button>
        {saved ? (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.25, ease: "easeOut" }}
            className="text-sm font-medium text-emerald-300"
          >
            Feedback saved. Thank you.
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
