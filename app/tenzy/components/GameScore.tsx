"use client";

import { useGameContext } from "@/app/tenzy/context/GameContext";

export default function GameScore() {
  const { score } = useGameContext();
  return <p>Score: {score}</p>;
}
