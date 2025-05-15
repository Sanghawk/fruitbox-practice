import { ScoringStrategy } from "./ScoringStrategy";
import { GameGridCell } from "../types";

export class TenzyScoringV2 implements ScoringStrategy {
  pointsForClear(cells: GameGridCell[]): number {
    const cellCount = cells.length;
    const LEN_MULT_FACTOR = 0.1;
    const lengthMultiplier = 1 + LEN_MULT_FACTOR * (cellCount - 2);
    const SHAPE_MULT_FACTOR = 0.2;
    const shapeMultiplier = 1 + SHAPE_MULT_FACTOR * isRectSelect(cells);
    const score = cellCount * lengthMultiplier * shapeMultiplier;

    return score;
  }
  validate(cells: GameGridCell[]): boolean {
    if (cells.length < 2) return false;
    const sum = cells.reduce((acc, cell) => acc + cell.value, 0);
    return sum === 10;
  }
}

function isRectSelect(cells: GameGridCell[]) {
  if (cells.length === 0) return 0;

  // Get unique rows and columns
  const rows = new Set(cells.map((cell) => cell.row));
  const cols = new Set(cells.map((cell) => cell.col));

  // If all cells are in same row or same column, return 0
  if (rows.size === 1 || cols.size === 1) return 0;

  // Check if all cells form a rectangle
  // For a rectangle, every cell in the grid defined by min/max row and col must be selected
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);

  // Create a set of all expected cell positions in the rectangle
  const expectedCells = new Set<string>();
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      expectedCells.add(`${row},${col}`);
    }
  }

  // Check if all selected cells are in the expected positions
  const selectedCellPositions = new Set(
    cells.map((cell) => `${cell.row},${cell.col}`)
  );

  // If all expected positions are selected, it's a rectangle
  return expectedCells.size === selectedCellPositions.size ? 1 : 0;
}
