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
  } = useGameContext();

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        ref={gameContainerRef}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative w-[250px] h-[250px] border-1 select-none"
      >
        {/* 10 by 10 cells */}
        <div className="grid grid-rows-10 grid-cols-10">
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
