import LeaderboardRSC from "@/app/tenzy/components/LeaderboardRSC";
import prisma from "@/lib/prisma";

export const revalidate = 0;
export default async function TenzyLeaderboard() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Leaderboard",
    name: "Tenzy Leaderboard",
    url: "https://www.whileinqueue.io/tenzy/leaderboard",
    description: "Leaderboard for Tenzy",
  };
  const scores = await prisma.score.findMany({
    orderBy: [{ value: "desc" }, { createdAt: "desc" }],
    include: { user: true },
  });

  return (
    <div className="p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LeaderboardRSC scores={scores} />
    </div>
  );
}
