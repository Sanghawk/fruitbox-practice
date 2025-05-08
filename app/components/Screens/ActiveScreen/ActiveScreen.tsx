"use client";
import { BOARD_COLS, BOARD_ROWS, CELL_SIZE } from "@/constants/config";
import { useGameContext } from "@/context/GameContext";
import FruitCell from "./FruitCell";
import { Fruit } from "@/types";
import ResetButton from "@/components/ResetButton";
import Score from "@/components/Score";
import TimeLeft from "@/components/TimeLeft";
import clsx from "clsx";

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

  // overscroll-contain - prevents refresh / scroll chaining on mobile
  // touch-none - disables all native touch panning so the pointer events fire immediately
  const DROP_IN_CLASSNAME_FIX_FOR_MOBILE = "overscroll-contain touch-none";
  return (
    <div className="sticky top-[64px] h-[calc(100dvh-64px)] ">
      <div className="h-full flex flex-col justify-center gap-4">
        <div
          className="mx-auto"
          style={{ width: `${BOARD_COLS * CELL_SIZE}px` }}
        >
          <ResetButton />
        </div>
        <div
          ref={gameContainerRef}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className={clsx(
            "relative border-1 border-base-900 select-none mx-auto",
            DROP_IN_CLASSNAME_FIX_FOR_MOBILE
          )}
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
              className="absolute"
              style={{
                left: userSelectBoxRect.left,
                top: userSelectBoxRect.top,
                width: userSelectBoxRect.width,
                height: userSelectBoxRect.height,
              }}
            ></div>
          )}
        </div>
        <div
          className="mx-auto"
          style={{ width: `${BOARD_COLS * CELL_SIZE}px` }}
        >
          <div className="flex flex-row justify-between">
            <Score />
            <TimeLeft />
          </div>
        </div>
      </div>
    </div>
  );
}
