import Link from "next/link";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type ClassNameProps = {
  className?: string;
};

function joinClassNames(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Panel({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & ClassNameProps) {
  return (
    <div className={joinClassNames("pf-panel", className)} {...props}>
      {children}
    </div>
  );
}

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & ClassNameProps) {
  return (
    <div className={joinClassNames("pf-panel rounded-xl p-5", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-2 text-slate-300">{subtitle}</p> : null}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <header className={className}>
      {eyebrow ? <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-300">{eyebrow}</p> : null}
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-2 text-slate-300">{subtitle}</p> : null}
    </header>
  );
}

export function StatChip({
  children,
  tone = "cyan",
}: {
  children: ReactNode;
  tone?: "cyan" | "emerald" | "amber";
}) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
      : tone === "amber"
        ? "border-amber-400/40 bg-amber-500/10 text-amber-300"
        : "border-cyan-400/40 bg-cyan-500/10 text-cyan-300";

  return (
    <span className={joinClassNames("pf-stat-chip", toneClass)}>
      {children}
    </span>
  );
}

export function PrimaryLinkButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={joinClassNames("pf-btn-primary pf-focus-ring px-5 py-3", className)}>
      {children}
    </Link>
  );
}

export function MutedLinkButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={joinClassNames("pf-btn-muted pf-focus-ring px-4 py-2 text-white", className)}
    >
      {children}
    </Link>
  );
}

export function PrimaryButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ClassNameProps) {
  return (
    <button className={joinClassNames("pf-btn-primary pf-focus-ring px-4 py-2", className)} {...props}>
      {children}
    </button>
  );
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ClassNameProps & { variant?: "primary" | "muted" }) {
  const base =
    variant === "primary"
      ? "pf-btn-primary pf-focus-ring px-4 py-2"
      : "pf-btn-muted pf-focus-ring px-4 py-2 text-white";
  return (
    <button className={joinClassNames(base, className)} {...props}>
      {children}
    </button>
  );
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <Panel className={joinClassNames("mx-auto max-w-2xl p-8 text-center", className)}>
      <h1 className="mb-3 text-3xl font-bold">{title}</h1>
      <p className="mb-6 text-slate-300">{description}</p>
      {action}
    </Panel>
  );
}
