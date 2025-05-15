"use client";

import { useGameContext } from "@/app/tenzy/context/GameContext";

function formatNumber(num: number): string {
  const str = num.toFixed(2);
  return str.replace(/\.?0+$/, "");
}

export default function FinalScoreMessage() {
  const { score } = useGameContext();

  return (
    <h3 className="text-2xl font-bold">
      You scored <span className="text-primary">{formatNumber(score)}</span>{" "}
      points!
    </h3>
  );
}
