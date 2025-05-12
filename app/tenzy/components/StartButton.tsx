"use client";

import { useGameContext } from "@/app/tenzy/context/GameContext";

// TODO: Should be able to start game with keyboard macro
export default function StartButton({ text = "Start" }: { text?: string }) {
  const { handleGameStart } = useGameContext();

  return (
    <button className="btn btn-md btn-primary w-full" onClick={handleGameStart}>
      {text}
    </button>
  );
}
