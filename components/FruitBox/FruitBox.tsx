"use client";

import { useGameContext } from "@/providers/GameProvider";
import FruitCell from "./FruitCell";

export default function FruitBox() {
  const {
    fruits,
    gameContainerRef,
    userSelectBoxRect,
    userSelectedFruits,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
    col,
    row,
    cellSize,
  } = useGameContext();

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        ref={gameContainerRef}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative border-1 select-none"
        style={{
          width: `${col * cellSize}px`,
          height: `${row * cellSize}px`,
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateRows: `repeat(${row}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
          }}
        >
          {fruits.map((fruit) => (
            <FruitCell
              key={fruit.id}
              selected={userSelectedFruits.has(fruit.id)}
              fruit={fruit}
            />
          ))}
        </div>

        {userSelectBoxRect && (
          <div
            className="absolute border-1"
            style={{
              left: userSelectBoxRect.left,
              top: userSelectBoxRect.top,
              width: userSelectBoxRect.width,
              height: userSelectBoxRect.height,
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
