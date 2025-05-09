"use client";
import { SubmitScoreForm } from "@/app/tenzy/components/SubmitScoreForm";
import { useGameContext } from "@/app/tenzy/context/GameContext";
import { useState, useEffect } from "react";

interface Score {
  id: string;
  value: number;
  user: {
    name: string;
  };
}
export default function ResultsRCC() {
  const { score } = useGameContext();
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    fetch("/api/score?limit=3")
      .then((res) => res.json())
      .then((data) => setScores(data));
  }, []);

  return (
    <div className="prose dark:prose-invert">
      <h3>You scored {score} points</h3>
      <div>
        <p>Submit your score on the leaderboard:</p>
        <SubmitScoreForm finalScore={score} />
      </div>
      <main className="">
        <h3 className="">🏆 Leaderboard</h3>
        <ol className="pl-0">
          {scores.map((s, i) => (
            <li key={s.id} className="flex justify-between">
              <span>
                {i + 1}. {s.user.name}
              </span>
              <span>{s.value} pts</span>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
