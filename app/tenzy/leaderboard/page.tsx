import Leaderboard from "@/app/tenzy/components/Leaderboard";
import { API_BASE_URL } from "../constants/config";
import { Suspense } from "react";

export default async function TenzyLeaderboard() {
  const res = await fetch(`${API_BASE_URL}/api/score`, {
    next: { revalidate: 0 },
  });
  const scores = await res.json();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Leaderboard",
    name: "Tenzy Leaderboard",
    url: "https://www.whileinqueue.io/tenzy/leaderboard",
    description: "Leaderboard for Tenzy",
  };

  return (
    <div className="p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <Leaderboard scores={scores} />
      </Suspense>
    </div>
  );
}
