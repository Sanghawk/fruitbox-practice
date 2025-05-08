import { BOARD_ROWS, BOARD_COLS } from "@/constants/config";
import { GameGridCell } from "@/types";

/**
 * Generate an initial array of GameGridCell objects.
 * @returns GameGridCell[] — randomized grid of game grid cells
 */
export function generateGameGridCells(): GameGridCell[] {
  const total = BOARD_ROWS * BOARD_COLS;
  return Array.from({ length: total }, (_, i) => ({
    id: `gamegridcell-${i}`,
    value: getRandomGameGridCellValue(),
    col: i % BOARD_COLS,
    row: Math.floor(i / BOARD_COLS),
  }));
}

export function getRandomGameGridCellValue(): number {
  return Math.floor(Math.random() * 9) + 1;
}

