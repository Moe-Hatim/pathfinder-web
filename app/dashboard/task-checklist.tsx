"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { updateTaskProgressAction } from "@/app/dashboard/actions";

type TaskChecklistProps = {
  assessmentId: string;
  tasks: string[];
  initialCompletedTasks: string[];
};

export function TaskChecklist({ assessmentId, tasks, initialCompletedTasks }: TaskChecklistProps) {
  const emptyState = useMemo(
    () => Object.fromEntries(tasks.map((task) => [task, false])),
    [tasks],
  );
  const [state, setState] = useState<Record<string, boolean>>(() =>
    tasks.reduce<Record<string, boolean>>((acc, task) => {
      acc[task] = initialCompletedTasks.includes(task);
      return acc;
    }, { ...emptyState }),
  );

  const completed = tasks.filter((task) => state[task]).length;
  const progress = Math.round((completed / tasks.length) * 100);
  const isComplete = progress === 100;

  return (
    <div className="pf-panel space-y-4 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">This Week Checklist</h2>
        <span className="text-sm text-cyan-300">{progress}% completed</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className="h-full bg-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {isComplete ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
        >
          Milestone completed. Great consistency this week.
        </motion.div>
      ) : null}

      <ul className="space-y-3">
        {tasks.map((task, index) => {
          const isDone = Boolean(state[task]);
          return (
            <motion.li
              key={task}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.3 }}
              className="flex items-start gap-3 rounded-lg px-2 py-1 transition hover:bg-slate-900/60"
            >
              <input
                id={task}
                type="checkbox"
                checked={isDone}
                onChange={async (event) => {
                  const nextValue = event.target.checked;
                  setState((prev) => ({
                    ...prev,
                    [task]: nextValue,
                  }));

                  try {
                    await updateTaskProgressAction({
                      assessmentId,
                      taskKey: task,
                      completed: nextValue,
                    });
                  } catch {
                    setState((prev) => ({
                      ...prev,
                      [task]: !nextValue,
                    }));
                  }
                }}
                className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400"
              />
              <label htmlFor={task} className={isDone ? "text-slate-400 line-through" : "text-slate-200"}>
                {task}
              </label>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
