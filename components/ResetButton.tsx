"use client";

import { useGameContext } from "@/context/GameContext";

export default function ResetButton() {
  const { handleGameReset } = useGameContext();

  return <button onClick={handleGameReset}>Reset</button>;
}
