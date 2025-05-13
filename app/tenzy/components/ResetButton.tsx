"use client";

import { useGameContext } from "@/app/tenzy/context/GameContext";

export default function ResetButton() {
  const { handleGameReset } = useGameContext();

  return (
    <button
      className="text-sm btn btn-sm btn-primary font-mono"
      onClick={handleGameReset}
    >
      reset
    </button>
  );
}
