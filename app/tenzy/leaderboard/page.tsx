import LeaderboardRSC from "@/app/tenzy/components/LeaderboardRSC";
import { API_BASE_URL } from "@/app/tenzy/constants/config";

export default async function TenzyLeaderboard() {
  const scores = await fetch(`${API_BASE_URL}/api/score`).then((res) =>
    res.json()
  );
  return (
    <div className="p-4">
      <LeaderboardRSC scores={scores} />
    </div>
  );
}
