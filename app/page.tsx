"use client";
import { useEffect, useRef, useState } from "react";

const DIM_ROW = 10;
const DIM_COL = 10;

export default function Home() {
  return (
    <div>
      <Box col={DIM_COL} row={DIM_ROW} />
    </div>
  );
}

function Box({ col, row }: { col: number; row: number }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [current, setCurrent] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  function handlePointerEnter() {
    console.log("pointer enter");
  }
  function handlePointerLeave() {
    console.log("pointer leave");
  }
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!boxRef.current) return;
    const rect = boxRef.current?.getBoundingClientRect();
    setCurrent({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    console.log("pointer move");
  }
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!boxRef.current) return;
    const rect = boxRef.current?.getBoundingClientRect();
    console.log(rect, rect.left, rect.top);
    setOrigin({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsSelecting(true);
    console.log("pointer down", "x", e.clientX, "y", e.clientY);
  }
  function handlePointerUp() {
    setIsSelecting(false);
    console.log("pointer up");
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div
        ref={boxRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative w-[500px] h-[500px] border-1"
      >
        {isSelecting && (
          <div
            className="absolute border-1"
            style={{
              left: Math.min(origin.x, current.x),
              top: Math.min(origin.y, current.y),
              width: Math.abs(current.x - origin.x),
              height: Math.abs(current.y - origin.y),
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
