import { Leaderboard } from "@/app/tenzy/components/Leaderboard";
import { API_BASE_URL } from "../constants/config";
import { PaginatedScoreResponse } from "../types";

export default async function TenzyLeaderboard() {
  const limit = 25;
  const res = await fetch(`${API_BASE_URL}/api/score?limit=${limit}`, {
    next: { revalidate: 0 },
  });
  const paginatedScores = (await res.json()) as PaginatedScoreResponse;

  // TODO: this doesn't work
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Leaderboard",
    name: "Tenzy Leaderboard",
    url: "https://www.whileinqueue.io/tenzy/leaderboard",
    description: "Leaderboard for Tenzy",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Leaderboard limit={limit} {...paginatedScores} />
    </>
  );
}
