"use client";

import { useGameContext } from "@/app/tenzy/context/GameContext";

export default function TimeLeftRCC() {
  const { timeLeft } = useGameContext();

  return <div>{timeLeft}</div>;
}
