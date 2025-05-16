export type Point = {
  x: number;
  y: number;
};

export type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type GameGridCellId = string;

export type GameGridCell = {
  id: GameGridCellId;
  value: number;
  col: number;
  row: number;
};

export enum GameLifeCycle {
  WAITING_USER_START,
  GAME_IN_PROGRESS,
  GAME_OVER,
}
export type Score = {
  id: string;
  value: number;
  userId: string;
  createdAt: string;
  user: {
    id: string;
    createdAt: string;
    name: string;
  };
};

export interface PaginatedScoreResponse {
  items: Score[];
  nextCursor: string | null;
}
