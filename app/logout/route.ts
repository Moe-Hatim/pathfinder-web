import { NextResponse } from "next/server";
import { endAuthSession } from "@/lib/auth-session";

export const dynamic = "force-dynamic";

async function performLogout(request: Request) {
  await endAuthSession();
  return NextResponse.redirect(new URL("/", request.url));
}

export async function GET(request: Request) {
  return performLogout(request);
}

export async function POST(request: Request) {
  return performLogout(request);
}
