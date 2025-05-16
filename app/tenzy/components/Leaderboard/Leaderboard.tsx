import { PaginatedScoreResponse } from "@/app/tenzy/types";
import InfiniteScoresList from "./InfiniteScoreList";

interface LeaderboardProps extends PaginatedScoreResponse {
  limit: number;
}
export default async function Leaderboard({
  limit,
  items,
  nextCursor,
}: LeaderboardProps) {
  return (
    <InfiniteScoresList items={items} nextCursor={nextCursor} limit={limit} />
  );
}
