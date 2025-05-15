import { ScoringStrategy } from "./ScoringStrategy";
import { GameGridCell } from "../types";

export class DefaultTenzyScoring implements ScoringStrategy {
  pointsForClear(cells: GameGridCell[]): number {
    return cells.length;
  }
  validate(cells: GameGridCell[]): boolean {
    if (cells.length < 2) return false;
    const sum = cells.reduce((acc, cell) => acc + cell.value, 0);
    return sum === 10;
  }
}
