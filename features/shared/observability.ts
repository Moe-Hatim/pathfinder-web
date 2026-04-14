import "server-only";

import { randomUUID } from "node:crypto";

type LogLevel = "info" | "warn" | "error";

export type RequestContext = {
  requestId: string;
  startedAt: number;
  scope: string;
};

export function createRequestContext(scope: string): RequestContext {
  return {
    requestId: randomUUID(),
    startedAt: Date.now(),
    scope,
  };
}

export function logEvent(
  level: LogLevel,
  ctx: RequestContext,
  message: string,
  meta?: Record<string, unknown>,
) {
  const payload = {
    level,
    scope: ctx.scope,
    requestId: ctx.requestId,
    ms: Date.now() - ctx.startedAt,
    message,
    ...(meta ?? {}),
  };

  const line = JSON.stringify(payload);
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}
