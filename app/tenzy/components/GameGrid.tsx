"use client";
import {
  BOARD_COLS,
  BOARD_ROWS,
  CELL_SIZE,
} from "@/app/tenzy/constants/config";
import { useGameContext } from "@/app/tenzy/context/GameContext";
import GameGridCell from "@/app/tenzy/components/GameGridCell";
import { GameGridCell as GameGridCellType } from "@/app/tenzy/types";
import clsx from "clsx";

export default function GameGrid() {
  const {
    gameGridCells,
    gameContainerRef,
    userSelectBoxRect,
    userSelectedGameGridCells,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
    handlePointerCancel,
  } = useGameContext();

  // overscroll-contain - prevents refresh / scroll chaining on mobile
  // touch-none - disables all native touch panning so the pointer events fire immediately
  const DROP_IN_CLASSNAME_FIX_FOR_MOBILE = "overscroll-contain touch-none";
  return (
    <div
      ref={gameContainerRef}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
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
        {gameGridCells.map((gameGridCell: GameGridCellType) => (
          <GameGridCell
            key={gameGridCell.id}
            selected={userSelectedGameGridCells.has(gameGridCell.id)}
            gameGridCell={gameGridCell}
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
  );
}
