export default function LeaderboardLoading() {
  return (
    // TODO: add loading skeleton based on infinite-score-list.tsx
    // note: runs on initial load, waiting for page.tsx to fetch data
    <div className="p-4">
      <p className="animate-pulse text-gray-500">Loading users…</p>
    </div>
  );
}
