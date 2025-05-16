import { PaginatedScoreResponse } from "@/app/tenzy/types";
import InfiniteScoresList from "./InfiniteScoreList";
import { API_BASE_URL } from "@/app/tenzy/constants/config";

export default async function Leaderboard({ limit }: { limit: number }) {
  const res = await fetch(`${API_BASE_URL}/api/score?limit=${limit}`, {
    next: { revalidate: 0 },
  });
  const paginatedScores = (await res.json()) as PaginatedScoreResponse;
  return <InfiniteScoresList {...paginatedScores} limit={limit} />;
}
