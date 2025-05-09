import LeaderboardRSC from "@/app/tenzy/components/LeaderboardRSC";
import prisma from "@/lib/prisma";

export const revalidate = 0; // invalidate every min
export default async function TenzyLeaderboard() {
  const scores = await prisma.score.findMany({
    orderBy: [{ value: "desc" }, { createdAt: "desc" }],
    include: { user: true },
  });

  return (
    <div className="p-4">
      <LeaderboardRSC scores={scores} />
    </div>
  );
}
