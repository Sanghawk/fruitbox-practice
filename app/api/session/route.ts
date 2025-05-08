import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";

const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});

export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { success } = await limiter.limit(ip);
  if (!success) return new NextResponse("Rate limit hit", { status: 429 });

  const sessionId = uuid();
  await redis.set(sessionId, "unused", { ex: 300 });
  return NextResponse.json({ sessionId });
}
