"use client";

import { useGameContext } from "@/context/GameContext";

export default function ResetButton() {
  const { handleGameReset } = useGameContext();

  return (
    <button
      className="w-full rounded-md bg-base-900 px-4 py-2 text-sm font-semibold text-base-50"
      onClick={handleGameReset}
    >
      Reset
    </button>
  );
}
