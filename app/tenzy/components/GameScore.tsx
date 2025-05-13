"use client";
import { useGameContext } from "@/app/tenzy/context/GameContext";
import { useEffect, useState } from "react";

export default function GameScore() {
  const { score } = useGameContext();
  const [localScore, setLocalScore] = useState(score);
  const [diff, setDiff] = useState(0);
  const [showDiff, setShowDiff] = useState(false);

  useEffect(() => {
    if (score === 0) {
      setLocalScore(score);
      setDiff(0);
      setShowDiff(false);
      return;
    }
    if (score !== localScore) {
      const delta = score - localScore;
      setDiff(delta);
      setLocalScore(score);
      setShowDiff(true);

      const timer = setTimeout(() => {
        setShowDiff(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [score]);
  return (
    <div className="font-mono">
      <span className="text-sm">score:&nbsp;</span>
      <span className="text-xl font-black">{score}</span>
      <span
        className={`text-sm text-green-500 font-mono transition-opacity duration-300 ${
          showDiff ? "opacity-100" : "opacity-0"
        }`}
      >
        &nbsp;+{diff}
      </span>
    </div>
  );
}
