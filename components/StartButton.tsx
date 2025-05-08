"use client";

import { useGameContext } from "@/context/GameContext";

// TODO: Move button styling to layer components
// TODO: Should be able to start game with keyboard macro
export default function StartButton() {
  const { handleGameStart } = useGameContext();

  return (
    <button
      className="w-full rounded-md bg-fuchsia-500 px-4 py-2 text-sm font-semibold text-base-50"
      onClick={handleGameStart}
    >
      Start
    </button>
  );
}
