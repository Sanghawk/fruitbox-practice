"use client";

import { memo } from "react";
import { useGameContext } from "../context/GameContext";

export default function TimeLeft() {
  const { timeLeft } = useGameContext();

  return <MemoizedTimeLeft timeLeft={timeLeft} />;
}
const MemoizedTimeLeft = memo(TimeLeftPureComponent);
function TimeLeftPureComponent({ timeLeft }: { timeLeft: number }) {
  return <div>{timeLeft}</div>;
}
