"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PathfinderLogo } from "@/components/brand/pathfinder-logo";

type HeaderNavigationProps = {
  isAuthenticated: boolean;
  userName?: string;
};

type NavItem = {
  href: string;
  label: string;
  authOnly?: boolean;
};

const navItems: NavItem[] = [
  { href: "/home", label: "Home", authOnly: true },
  { href: "/assessment", label: "Assessment" },
  { href: "/results", label: "Results", authOnly: true },
  { href: "/dashboard", label: "Dashboard", authOnly: true },
  { href: "/paths", label: "Paths" },
];

function navLinkClass(isActive: boolean) {
  return isActive
    ? "rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-200"
    : "rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-900/70";
}

export function HeaderNavigation({ isAuthenticated, userName }: HeaderNavigationProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSignedIn = isAuthenticated;
  const visibleItems = navItems.filter((item) => !item.authOnly || isSignedIn);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/70 bg-slate-950/92 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="pf-focus-ring rounded-lg">
          <PathfinderLogo compact />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {visibleItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(pathname === item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {userName ? <p className="mr-2 text-sm text-slate-300">Hi, {userName}</p> : null}
          {isSignedIn ? (
            <form action="/logout" method="post">
              <button type="submit" className="pf-btn-muted pf-focus-ring px-3 py-2 text-sm font-semibold text-white">
                Log Out
              </button>
            </form>
          ) : (
            <>
              <Link href="/auth/login" className="pf-btn-muted pf-focus-ring px-3 py-2 text-sm font-semibold text-white">
                Log In
              </Link>
              <Link href="/auth/signup" className="pf-btn-primary pf-focus-ring px-3 py-2 text-sm">
                Create Account
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="pf-btn-muted pf-focus-ring min-h-10 px-3 py-2 text-sm font-semibold text-white lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="header-mobile-nav"
        >
          Menu
        </button>
      </div>

      {mobileOpen ? (
        <div id="header-mobile-nav" className="border-t border-slate-800 bg-slate-950/95 px-4 py-4 lg:hidden">
          <nav className="mb-3 grid gap-2">
            {visibleItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={navLinkClass(pathname === item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-2">
            {isSignedIn ? (
              <form action="/logout" method="post">
                <button
                  type="submit"
                  onClick={() => setMobileOpen(false)}
                  className="pf-btn-muted pf-focus-ring px-3 py-2 text-sm font-semibold text-white"
                >
                  Log Out
                </button>
              </form>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="pf-btn-muted pf-focus-ring px-3 py-2 text-sm font-semibold text-white"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="pf-btn-primary pf-focus-ring px-3 py-2 text-sm"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
