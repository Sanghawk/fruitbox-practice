"use client";

import React, { memo, useMemo } from "react";
import { useGameContext } from "../context/GameContext";

export default function TimeLeftBar() {
  const { timeLeft, duration } = useGameContext();
  return <MemoizedTimeLeftBar timeLeft={timeLeft} totalTime={duration} />;
}

interface Props {
  timeLeft: number;
  totalTime: number;
}

const MemoizedTimeLeftBar = memo(TimeLeftBarPure);

function TimeLeftBarPure({ timeLeft, totalTime }: Props) {
  // 1. Compute remaining percentage [0–100]
  const pct = useMemo(
    () => Math.max(0, Math.min(100, (timeLeft / totalTime) * 100)),
    [timeLeft, totalTime]
  );

  // 2. Map pct→hue (120=green → 60=yellow → 0=red)
  const hue = useMemo(() => (pct * 120) / 100, [pct]);

  // 3. Build inline style only when pct or hue change
  const barStyle = useMemo<React.CSSProperties>(
    () => ({
      width: `${pct}%`,
      background: `hsl(${hue}, 100%, 50%)`,
      transition: "width 1s linear, background 1s linear",
    }),
    [pct, hue]
  );

  // 4. Add pulse when < 10s
  const pulse = timeLeft <= 10 ? "animate-pulse" : "";

  return (
    <div className="w-full h-[1px] bg-transparent  overflow-hidden">
      <div className={`h-full  ${pulse}`} style={barStyle} />
    </div>
  );
}
