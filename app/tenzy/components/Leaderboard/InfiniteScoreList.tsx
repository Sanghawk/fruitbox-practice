"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PaginatedScoreResponse, Score } from "@/app/tenzy/types";
import clsx from "clsx";

interface InfiniteScoresListProps extends PaginatedScoreResponse {
  limit: number;
}
// TODO: move this to utils
function formatNumber(num: number): string {
  const str = num.toFixed(2);
  return str.replace(/\.?0+$/, "");
}

export default function InfiniteScoresList({
  items: initialScores,
  nextCursor: initialNextCursor,
  limit,
}: InfiniteScoresListProps) {
  const [scores, setScores] = useState<Score[]>(initialScores);
  const [cursor, setCursor] = useState<string | null>(initialNextCursor);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLLIElement>(null);

  const loadMore = useCallback(async () => {
    if (!cursor || loading) return;
    setLoading(true);
    const res = await fetch(
      `/api/score?limit=${limit}&cursor=${encodeURIComponent(cursor)}`,
      { cache: "no-store" }
    );
    const { items: newItems, nextCursor } = await res.json();
    setScores((prev) => [...prev, ...newItems]);
    setCursor(nextCursor);
    setLoading(false);
  }, [cursor, loading]);

  // set up intersection observer on the sentinel div
  useEffect(() => {
    if (!sentinelRef.current || !cursor) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" } // preload before it scrolls into view
    );

    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [loadMore, cursor]);

  return (
    <ol className="p-4 flex flex-col gap-2">
      {scores.map((s, i) => (
        <li
          key={s.id}
          className={clsx("flex justify-between", {
            "text-md font-bold px-4 py-2 ring-1 ring-yellow-500/20 text-yellow-500 bg-yellow-500/10 rounded-md":
              i === 0,
            "text-md font-bold px-4 py-2 ring-1 ring-gray-500/20 text-gray-400 bg-gray-500/10 rounded-md":
              i === 1,
            "text-md font-bold px-4 py-2 ring-1 ring-amber-700/20 text-amber-700 bg-amber-700/10 rounded-md":
              i === 2,
          })}
        >
          <span>
            {i === 0 && "🥇"}
            {i === 1 && "🥈"}
            {i === 2 && "🥉"}
            {i > 2 && `${i + 1}.`} {s.user.name}
          </span>
          <span className="font-mono">{formatNumber(Number(s.value))} pts</span>
        </li>
      ))}

      {/* sentinel */}
      {cursor ? (
        <li ref={sentinelRef} className="text-center p-4 text-gray-500">
          {loading ? "Loading more scores…" : "Show more scores"}
        </li>
      ) : (
        <li className="text-center p-4 text-gray-500">No more scores</li>
      )}
    </ol>
  );
}
