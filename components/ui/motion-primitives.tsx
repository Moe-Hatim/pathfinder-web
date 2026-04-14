"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ChildrenProps = {
  children: ReactNode;
  className?: string;
};

export function PageReveal({ children, className }: ChildrenProps) {
  return (
    <motion.main
      initial={false}
      animate={{ opacity: [0, 1], y: [16, 0] }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.main>
  );
}

export function RiseIn({
  children,
  className,
  delay = 0,
}: ChildrenProps & { delay?: number }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: [0, 1], y: [18, 0] }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
}: ChildrenProps & { delay?: number }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: [0, 1], scale: [0.98, 1] }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({ children, className }: ChildrenProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
