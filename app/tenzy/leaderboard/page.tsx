import Leaderboard from "@/app/tenzy/components/Leaderboard/Leaderboard";
import { Suspense } from "react";
export default async function TenzyLeaderboard() {
  const limit = 25;

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
      <h1 className="page-title mb-4">Tenzy Leaderboard</h1>
      <Suspense fallback={null}>
        <Leaderboard limit={limit} />
      </Suspense>
    </div>
  );
}
