"use client";

import { useGameContext } from "@/app/tenzy/context/GameContext";

export default function GameScore() {
  const { score } = useGameContext();
  return (
    <div className="font-mono">
      <span className="text-sm">score:&nbsp;</span>
      <span className="text-xl font-black">{score}</span>
    </div>
  );
}
