"use client";

import { useGameContext } from "@/context/GameContext";

// TODO: Should be able to start game with keyboard macro
export default function StartButton() {
  const { handleGameStart } = useGameContext();

  return (
    <button className="btn btn-md btn-primary w-full" onClick={handleGameStart}>
      Start
    </button>
  );
}
