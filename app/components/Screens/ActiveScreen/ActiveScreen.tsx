"use client";
import { BOARD_COLS, BOARD_ROWS, CELL_SIZE } from "@/constants/config";
import { useGameContext } from "@/context/GameContext";
import FruitCell from "./FruitCell";
import { Fruit } from "@/types";
import ResetButton from "@/components/ResetButton";
import Score from "@/components/Score";

export default function ActiveScreen() {
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
    <div>
      <div
        ref={gameContainerRef}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative border-1 select-none"
        style={{
          width: `${BOARD_COLS * CELL_SIZE}px`,
          height: `${BOARD_ROWS * CELL_SIZE}px`,
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateRows: `repeat(${BOARD_ROWS}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${BOARD_COLS}, minmax(0, 1fr))`,
          }}
        >
          {fruits.map((fruit: Fruit) => (
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
      <div>
        <Score />
        <ResetButton />
      </div>
    </div>
  );
}
