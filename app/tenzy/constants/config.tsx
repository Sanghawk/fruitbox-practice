/** Number of rows in the game grid */
export const BOARD_ROWS = 8;
/** Number of columns in the game grid */
export const BOARD_COLS = 8;
/** Pixel size of each cell */
export const CELL_SIZE = 44;
/** Duration (s) of each game session */

export const GAME_DURATION =
  process.env.NODE_ENV === "production"
    ? 90 // Production: 90 seconds
    : 1000; // Development: 30 seconds

export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.whileinqueue.io"
    : "http://localhost:3000";
