"use client";

import { useGameContext } from "@/app/tenzy/context/GameContext";

export default function ResetButtonRCC() {
  const { handleGameReset } = useGameContext();

  return (
    <button className="btn btn-sm btn-primary w-full" onClick={handleGameReset}>
      Reset
    </button>
  );
}
