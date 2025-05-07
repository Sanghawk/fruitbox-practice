"use client";

import { useGameContext } from "@/context/GameContext";

export default function StartButton() {
  const { handleGameStart } = useGameContext();

  return <button onClick={handleGameStart}>Start</button>;
}
