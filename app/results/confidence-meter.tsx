"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ConfidenceMeter({ value }: { value: number }) {
  const reduceMotion = useReducedMotion();
  const width = `${Math.max(0, Math.min(100, value))}%`;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-300">Confidence meter</span>
        <span className="font-semibold text-emerald-300">{value}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
          initial={reduceMotion ? false : { width: 0 }}
          animate={reduceMotion ? { width } : { width }}
          transition={reduceMotion ? undefined : { duration: 0.65, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
