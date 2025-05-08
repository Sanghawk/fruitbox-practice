"use client";
import StartButton from "@/components/StartButton";
import { SubmitScoreForm } from "@/components/SubmitScoreForm";
import { useGameContext } from "@/context/GameContext";
import { useState, useEffect } from "react";

interface Score {
  id: string;
  value: number;
  user: {
    name: string;
  };
}

export default function EndScreen() {
  return (
    <div className="sticky top-[64px] h-[calc(100dvh-64px)]">
      <div className="h-[calc(100dvh-64px)]">
        <div className="h-full mx-4 flex flex-col justify-center gap-4">
          <div>
            <div className="text-center mb-4">
              <h2 className="text-4xl font-bold">Game Over</h2>
            </div>
            <Results />
          </div>

          <div>
            <StartButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function Results() {
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
