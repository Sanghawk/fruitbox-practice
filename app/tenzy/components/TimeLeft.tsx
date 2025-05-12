"use client";

import { useGameContext } from "../context/GameContext";

export default function TimeLeft() {
  const { timeLeft } = useGameContext();

  return <div>{timeLeft}</div>;
}
