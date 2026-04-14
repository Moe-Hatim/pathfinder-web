import { submitOutcomeCheckinAction } from "@/app/dashboard/actions";
import type { OutcomeCheckin } from "@/lib/assessments";

type OutcomeCheckinProps = {
  assessmentId: string;
  existing: OutcomeCheckin | null;
};

export function OutcomeCheckinPanel({ assessmentId, existing }: OutcomeCheckinProps) {
  return (
    <section className="pf-panel rounded-2xl p-8">
      <h2 className="mb-2 text-xl font-semibold">2-4 Week Outcome Check-in</h2>
      <p className="mb-5 text-slate-300">
        Did this path help you move forward with projects or interviews?
      </p>

      <form action={submitOutcomeCheckinAction} className="space-y-4">
        <input type="hidden" name="assessmentId" value={assessmentId} />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="projectsCompleted" className="mb-2 block text-sm text-slate-200">
              Projects completed
            </label>
            <input
              id="projectsCompleted"
              name="projectsCompleted"
              type="number"
              min={0}
              max={20}
              defaultValue={existing?.projectsCompleted ?? 0}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
            />
          </div>

          <div>
            <label htmlFor="interviewsStarted" className="mb-2 block text-sm text-slate-200">
              Started interview applications?
            </label>
            <select
              id="interviewsStarted"
              name="interviewsStarted"
              defaultValue={existing?.interviewsStarted ? "yes" : "no"}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
            >
              <option value="no">Not yet</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="mb-2 block text-sm text-slate-200">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            defaultValue={existing?.notes ?? ""}
            rows={3}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none ring-cyan-400/40 transition focus:ring-2"
            placeholder="What helped or blocked your progress?"
          />
        </div>

        <button type="submit" className="pf-btn-primary px-5 py-3">
          Save Check-in
        </button>
      </form>
    </section>
  );
}
