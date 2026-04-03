"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Target,
  Sparkles,
  Route,
  Brain,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Discover Your Direction",
    description:
      "Understand which tech path fits your strengths, interests, and long-term goals.",
  },
  {
    icon: Route,
    title: "Follow Clear Roadmaps",
    description:
      "Get guided learning paths instead of learning many things without structure.",
  },
  {
    icon: Target,
    title: "Move With Purpose",
    description:
      "Turn confusion into action with practical next steps and focused growth.",
  },
];

const floatingCards = [
  {
    title: "Recommended Path",
    value: "Backend Engineering",
    sub: "High fit for logic-driven students",
  },
  {
    title: "Focus This Week",
    value: "Git + APIs",
    sub: "Build momentum with practical tasks",
  },
  {
    title: "Readiness Score",
    value: "42%",
    sub: "You’re progressing toward internship readiness",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.20),transparent_30%),linear-gradient(to_bottom,rgba(2,6,23,1),rgba(15,23,42,1))]" />

      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-0 top-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <header className="relative z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <Compass className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide">PathFinder</p>
              <p className="text-xs text-slate-400">Find your direction in tech</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden items-center gap-8 md:flex"
          >
            <Link
              href="/paths"
              className="text-sm text-slate-300 transition hover:text-cyan-400"
            >
              Paths
            </Link>
            <Link
              href="/assessment"
              className="text-sm text-slate-300 transition hover:text-cyan-400"
            >
              Assessment
            </Link>
            <Link
              href="/results"
              className="text-sm text-slate-300 transition hover:text-cyan-400"
            >
              Results
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl transition hover:scale-105 hover:bg-cyan-400/20"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </nav>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-90px)] max-w-7xl items-center gap-14 px-6 py-10 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Built for tech students in Rwanda
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="max-w-3xl text-5xl font-black leading-tight sm:text-6xl xl:text-7xl"
          >
            Find your{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
              direction
            </span>{" "}
            in tech.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            PathFinder helps students stop learning blindly. Discover the tech
            path that fits you, connect your skills to real opportunities, and
            follow a clearer roadmap forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/assessment"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-400 px-7 py-4 font-semibold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.25)] transition hover:scale-105"
            >
              Start Assessment
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/paths"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-medium text-white backdrop-blur-xl transition hover:scale-105 hover:border-cyan-400/40 hover:bg-white/10"
            >
              Explore Paths
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4 text-sm text-slate-300"
          >
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              Frontend
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              Backend
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              Data
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              Cybersecurity
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              Mobile
            </div>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="relative mx-auto max-w-xl rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">PathFinder Preview</p>
                <h2 className="text-2xl font-bold">Student Insight Panel</h2>
              </div>
              <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
                Live guidance
              </div>
            </div>

            <div className="space-y-4">
              {floatingCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg"
                >
                  <p className="text-sm text-slate-400">{card.title}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {card.value}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">{card.sub}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 -top-6 hidden rounded-2xl border border-violet-400/30 bg-violet-500/10 p-4 backdrop-blur-xl md:block"
            >
              <Brain className="mb-2 h-5 w-5 text-violet-300" />
              <p className="text-sm font-medium text-violet-200">
                Smart recommendation
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4 backdrop-blur-xl md:block"
            >
              <ShieldCheck className="mb-2 h-5 w-5 text-cyan-300" />
              <p className="text-sm font-medium text-cyan-200">
                Focused learning
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-400">
            Why PathFinder
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            More than advice. Real direction.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            PathFinder is designed to help students stop guessing, reduce
            confusion, and move with purpose.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.55 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20">
                  <Icon className="h-6 w-6 text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}