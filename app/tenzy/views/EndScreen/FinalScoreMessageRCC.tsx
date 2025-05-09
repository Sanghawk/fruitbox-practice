"use client";

import { useGameContext } from "@/app/tenzy/context/GameContext";

export default function FinalScoreMessageRCC() {
  const { score } = useGameContext();

  return (
    <h3 className="text-2xl font-bold">
      You scored <span className="text-primary">{score}</span> points!
    </h3>
  );
}
