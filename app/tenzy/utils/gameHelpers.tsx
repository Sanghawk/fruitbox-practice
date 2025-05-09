import { BOARD_ROWS, BOARD_COLS } from "../constants/config";
import { GameGridCell } from "../types";

export function sampleInitialValue(): number {
  // 1) Triangular weights
  const Traw = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  const Tsum = Traw.reduce((a, b) => a + b, 0);
  const T = Traw.map((w) => w / Tsum);

  // 2) Long‑combo weights precomputed over all partitions of 10 with length ≥ 3
  const D_long = [
    0.5303867403, // 1
    0.2209944751, // 2
    0.1104972376, // 3
    0.0662983425, // 4
    0.0331491713, // 5
    0.0220994475, // 6
    0.0110497238, // 7
    0.0055248619, // 8
    0.0, // 9
  ];

  // 3) Blend them: α for triangular, β for long‑combo
  const α = 0.5;
  const β = 0.5;
  const raw = T.map((t, i) => α * t + β * D_long[i]);

  // 4) Normalize to Pinit
  const S = raw.reduce((a, b) => a + b, 0);
  const Pinit = raw.map((w) => w / S);

  // 5) Weighted draw in [1..9]
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < 9; i++) {
    acc += Pinit[i];
    if (r < acc) return i + 1;
  }
  return 9;
}
/**
 * Generate an initial array of GameGridCell objects.
 * @returns GameGridCell[] — randomized grid of game grid cells
 */
export function generateGameGridCells(): GameGridCell[] {
  const total = BOARD_ROWS * BOARD_COLS;
  return Array.from({ length: total }, (_, i) => ({
    id: `gamegridcell-${i}`,
    value: sampleInitialValue(),
    col: i % BOARD_COLS,
    row: Math.floor(i / BOARD_COLS),
  }));
}

/**
 * Given the current grid, compute spawn probabilities for 1–9
 * based on a triangular target distribution and feedback from
 * the grid’s current frequencies.
 */
export function computeSpawnProbabilities(grid: GameGridCell[]): number[] {
  const TOTAL = BOARD_COLS * BOARD_ROWS;

  // 1) Count current frequencies A[i] for i = 1..9
  const counts = new Array(9).fill(0);
  for (const cell of grid) {
    counts[cell.value - 1]++;
  }
  const A = counts.map((c) => c / TOTAL);
  console.log("counts", counts);

  // 2) Static triangular target Traw = [1,2,3,4,5,4,3,2,1]
  const Traw = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  const Tsum = Traw.reduce((a, b) => a + b, 0);
  const T = Traw.map((w) => w / Tsum);

  // 3) Feedback “correction” weights: max(0, T[i]-A[i]) + ε
  const ε = 0.5;
  const feedbackW = T.map((t, i) => Math.max(0, t - A[i]) + ε);

  // 4) D_long: normalized counts over all partitions of 10 with length>=3
  //    (precomputed once, here hard‑coded)
  const D_long = [
    0.5303867403, // 1
    0.2209944751, // 2
    0.1104972376, // 3
    0.0662983425, // 4
    0.0331491713, // 5
    0.0220994475, // 6
    0.0110497238, // 7
    0.0055248619, // 8
    0.0, // 9
  ];

  // 5) Blend them: final raw weight = α·feedbackW + β·D_long
  const α = 0.5,
    β = 0.5;
  const hybridRaw = feedbackW.map((fw, i) => α * fw + β * D_long[i]);

  // 6) Normalize to P[i]
  const S = hybridRaw.reduce((a, b) => a + b, 0);
  return hybridRaw.map((w) => w / S);
}

/**
 * Draw a weighted random integer in [1..9] given probabilities P[0..8].
 */
function sampleFromProbabilities(P: number[]): number {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < P.length; i++) {
    acc += P[i];
    if (r < acc) return i + 1;
  }
  return 9; // fallback
}

export function getRandomGameGridCellValue(grid: GameGridCell[]): number {
  const P = computeSpawnProbabilities(grid);
  return sampleFromProbabilities(P);
}
