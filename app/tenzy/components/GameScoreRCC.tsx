"use client";

import { useGameContext } from "@/app/tenzy/context/GameContext";

export default function GameScoreRCC() {
  const { score } = useGameContext();
  return <p>Score: {score}</p>;
}
