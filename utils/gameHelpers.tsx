import { BOARD_ROWS, BOARD_COLS } from "@/constants/config";
import { Fruit } from "@/types";

/**
 * Generate an initial array of Fruit objects.
 * @returns Fruit[] — randomized grid of fruits
 */
export function generateFruits(): Fruit[] {
  const total = BOARD_ROWS * BOARD_COLS;
  return Array.from({ length: total }, (_, i) => ({
    id: `fruit-${i}`,
    value: getRandomFruitValue(),
    col: i % BOARD_COLS,
    row: Math.floor(i / BOARD_COLS),
    consumed: false,
  }));
}

export function getRandomFruitValue(): number {
  return Math.floor(Math.random() * 9) + 1;
}
