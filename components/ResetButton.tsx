"use client";

import { useGameContext } from "@/context/GameContext";

export default function ResetButton() {
  const { handleGameReset } = useGameContext();

  return (
    <button className="btn btn-sm btn-primary w-full" onClick={handleGameReset}>
      Reset
    </button>
  );
}
