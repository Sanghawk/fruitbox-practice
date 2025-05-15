import { GameGridCell } from "../types";

export interface ScoringStrategy {
  /** Calculate points to add when a set of cells is consumed. 
        @param cells - the array of GameGridCell that were cleared
        @return number of points earned for this event */
  pointsForClear(cells: GameGridCell[]): number;
  /** Validate if a set of cells is valid for scoring.
        @param cells - the array of GameGridCell that were selected
        @return true if the set of cells is valid for scoring, false otherwise */
  validate(cells: GameGridCell[]): boolean;
}
