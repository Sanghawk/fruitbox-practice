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

export type FruitId = string;

export type Fruit = {
  id: FruitId;
  value: number;
  col: number;
  row: number;
  consumed: boolean;
};

export enum GameLifeCycle {
  WAITING_USER_START,
  GAME_IN_PROGRESS,
  GAME_OVER,
}
