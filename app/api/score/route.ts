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
  const limit = Number(req.nextUrl.searchParams.get("limit") || 10);
  const top = await prisma.score.findMany({
    orderBy: [{ value: "desc" }, { createdAt: "desc" }],
    take: limit,
    include: { user: true },
  });
  return NextResponse.json(top);
}
