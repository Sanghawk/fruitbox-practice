"use client";

import { useGameContext } from "@/context/GameContext";

export default function Score() {
  const { score } = useGameContext();
  return <div>Score: {score}</div>;
}
