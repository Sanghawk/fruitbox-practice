// app/api/score/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";

export async function POST(req: Request) {
  const { name, score, sessionId } = await req.json();

  // 1. Validate token
  const status = await redis.get(sessionId);
  if (status !== "unused") {
    return NextResponse.json(
      { error: "Invalid/expired session" },
      { status: 403 }
    );
  }
  await redis.del(sessionId);

  // 2. Upsert user & record score
  await prisma.user.upsert({
    where: { name },
    update: {},
    create: { name },
  });
  await prisma.score.create({
    data: {
      value: score,
      user: { connect: { name } },
    },
  });

  return NextResponse.json({ success: true });
}

export async function GET(req: Request & { nextUrl: URL }) {
  const url = req.nextUrl;
  const limitParam = url.searchParams.get("limit");
  const cursorParam = url.searchParams.get("cursor");

  // 1. parse inputs
  const limit = Math.min(Number(limitParam) || 10, 100); // default=10, max=100
  const cursor = cursorParam ? { id: cursorParam } : undefined;

  // 2. fetch one extra record so we can tell if there *is* a next page
  const records = await prisma.score.findMany({
    take: limit + 1,
    ...(cursor && { cursor, skip: 1 }),
    orderBy: [
      { value: "desc" },
      { createdAt: "desc" },
      { id: "desc" }, // ensure a deterministic tie‑breaker
    ],
    include: { user: true },
  });

  // 3. determine if there's another page
  let nextCursor: string | null = null;
  if (records.length > limit) {
    const nextItem = records.pop()!; // remove the extra
    nextCursor = nextItem.id; // tell client where to pick up
  }

  // 4. serialize BigInt and Date fields
  const items = records.map((r) => ({
    ...r,
    value: r.value.toNumber(), // or .toString()
    createdAt: r.createdAt.toISOString(),
  }));

  return NextResponse.json({ items, nextCursor });
}
