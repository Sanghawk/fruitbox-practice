"use client";

import { useGameContext } from "@/app/tenzy/context/GameContext";

export default function TimeLeft() {
  const { timeLeft } = useGameContext();

  return <div>{timeLeft}</div>;
}
