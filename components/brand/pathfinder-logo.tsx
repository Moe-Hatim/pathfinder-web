import type { HTMLAttributes } from "react";

type PathfinderLogoProps = HTMLAttributes<HTMLDivElement> & {
  compact?: boolean;
};

function joinClassNames(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function PathfinderLogo({ className, compact = false, ...props }: PathfinderLogoProps) {
  return (
    <div className={joinClassNames("inline-flex items-center gap-3", className)} {...props}>
      <svg
        width={compact ? 34 : 40}
        height={compact ? 34 : 40}
        viewBox="0 0 40 40"
        role="img"
        aria-label="PathFinder logo mark"
      >
        <defs>
          <linearGradient id="pf-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="rgba(8,14,30,0.72)" stroke="url(#pf-logo-gradient)" strokeWidth="2" />
        <path d="M20 9 L24 20 L20 31 L16 20 Z" fill="url(#pf-logo-gradient)" />
        <circle cx="20" cy="20" r="2.2" fill="#e2f5ff" />
      </svg>

      <div>
        <p className="text-xl font-extrabold tracking-tight text-white">PathFinder</p>
        {!compact ? <p className="text-xs text-slate-300">Career direction for tech students</p> : null}
      </div>
    </div>
  );
}
