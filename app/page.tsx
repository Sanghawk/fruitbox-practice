"use client";
import { useRef, useState } from "react";

const DIM_ROW = 10;
const DIM_COL = 10;

type Point = {
  x: number;
  y: number;
};

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export default function Home() {
  return (
    <div>
      <FruitBox col={DIM_COL} row={DIM_ROW} />
    </div>
  );
}

function FruitBox({ col, row }: { col: number; row: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState<Point | null>(null);
  const [rect, setRect] = useState<Rect | null>(null);

  function handlePointerLeave() {
    setOrigin(null);
    setRect(null);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // If not left button or no container, do nothing
    if (e.button !== 0 || !containerRef.current) return;
    const containerBoundingRect = containerRef.current.getBoundingClientRect();

    const originX = e.clientX - containerBoundingRect.left;
    const originY = e.clientY - containerBoundingRect.top;
    // Set the origin and rect
    setOrigin({
      x: originX,
      y: originY,
    });
    setRect({
      left: originX,
      top: originY,
      width: 0,
      height: 0,
    });
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    // If not selecting or no origin or no container, do nothing
    if (!origin || !containerRef.current) return;
    const containerBoundingRect = containerRef.current.getBoundingClientRect();

    const originX = e.clientX - containerBoundingRect.left;
    const originY = e.clientY - containerBoundingRect.top;
    // Update the rect
    setRect({
      left: Math.min(origin.x, originX),
      top: Math.min(origin.y, originY),
      width: Math.abs(originX - origin.x),
      height: Math.abs(originY - origin.y),
    });
  }
  function handlePointerUp() {
    setOrigin(null);
    setRect(null);
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div
        ref={containerRef}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative w-[500px] h-[500px] border-1"
      >
        {rect && (
          <div
            className="absolute border-1"
            style={{
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
