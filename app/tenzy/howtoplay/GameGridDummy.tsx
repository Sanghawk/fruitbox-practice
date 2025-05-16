import {
  BOARD_COLS,
  BOARD_ROWS,
  CELL_SIZE,
} from "@/app/tenzy/constants/config";

import { GameGridCell as GameGridCellType } from "@/app/tenzy/types";
import clsx from "clsx";

export default function GameGridDummy({ example }: { example: string }) {
  let selectedSet = new Set();
  if (example === "1") {
    selectedSet = new Set(["1", "2"]);
  } else if (example === "2") {
    selectedSet = new Set(["11", "19", "27"]);
  } else if (example === "3") {
    selectedSet = new Set(["5", "6", "13", "14"]);
  } else if (example === "4") {
    selectedSet = new Set(["28", "29", "30", "31", "32"]);
  } else if (example === "5") {
    selectedSet = new Set(["41", "42", "43", "49", "50", "51"]);
  }

  const GAME_GRID_CELLS = [
    // Row 0
    { id: "1", value: 5, col: 0, row: 0 }, // Example 1 start
    { id: "2", value: 5, col: 1, row: 0 }, // Example 1 end
    { id: "3", value: 6, col: 2, row: 0 },
    { id: "4", value: 9, col: 3, row: 0 },
    { id: "5", value: 1, col: 4, row: 0 }, // Example 3 start
    { id: "6", value: 1, col: 5, row: 0 }, // Example 3
    { id: "7", value: 9, col: 6, row: 0 },
    { id: "8", value: 8, col: 7, row: 0 },

    // Row 1
    { id: "9", value: 8, col: 0, row: 1 },
    { id: "10", value: 7, col: 1, row: 1 },
    { id: "11", value: 7, col: 2, row: 1 }, // Example 2 start
    { id: "12", value: 3, col: 3, row: 1 },
    { id: "13", value: 1, col: 4, row: 1 }, // Example 3
    { id: "14", value: 7, col: 5, row: 1 }, // Example 3 end
    { id: "15", value: 4, col: 6, row: 1 },
    { id: "16", value: 4, col: 7, row: 1 },

    // Row 2
    { id: "17", value: 6, col: 0, row: 2 },
    { id: "18", value: 1, col: 1, row: 2 },
    { id: "19", value: 2, col: 2, row: 2 }, // Example 2 middle
    { id: "20", value: 3, col: 3, row: 2 },
    { id: "21", value: 2, col: 4, row: 2 },
    { id: "22", value: 8, col: 5, row: 2 },
    { id: "23", value: 1, col: 6, row: 2 },
    { id: "24", value: 8, col: 7, row: 2 },

    // Row 3
    { id: "25", value: 6, col: 0, row: 3 }, // Example 4 start
    { id: "26", value: 7, col: 1, row: 3 }, // Example 4
    { id: "27", value: 1, col: 2, row: 3 }, // Example 2 end
    { id: "28", value: 2, col: 3, row: 3 }, // Example 4
    { id: "29", value: 2, col: 4, row: 3 }, // Example 4
    { id: "30", value: 2, col: 5, row: 3 }, // Example 4 end
    { id: "31", value: 2, col: 6, row: 3 },
    { id: "32", value: 2, col: 7, row: 3 },

    // Row 4
    { id: "33", value: 2, col: 0, row: 4 },
    { id: "34", value: 1, col: 1, row: 4 },
    { id: "35", value: 2, col: 2, row: 4 },
    { id: "36", value: 3, col: 3, row: 4 },
    { id: "37", value: 7, col: 4, row: 4 },
    { id: "38", value: 3, col: 5, row: 4 },
    { id: "39", value: 8, col: 6, row: 4 },
    { id: "40", value: 4, col: 7, row: 4 },

    // Row 5
    { id: "41", value: 2, col: 0, row: 5 }, // Example 5 start
    { id: "42", value: 2, col: 1, row: 5 }, // Example 5
    { id: "43", value: 1, col: 2, row: 5 }, // Example 5
    { id: "44", value: 9, col: 3, row: 5 },
    { id: "45", value: 6, col: 4, row: 5 },
    { id: "46", value: 8, col: 5, row: 5 },
    { id: "47", value: 3, col: 6, row: 5 },
    { id: "48", value: 1, col: 7, row: 5 },

    // Row 6
    { id: "49", value: 3, col: 0, row: 6 }, // Example 5
    { id: "50", value: 1, col: 1, row: 6 }, // Example 5
    { id: "51", value: 1, col: 2, row: 6 }, // Example 5 end
    { id: "52", value: 9, col: 3, row: 6 },
    { id: "53", value: 2, col: 4, row: 6 },
    { id: "54", value: 3, col: 5, row: 6 },
    { id: "55", value: 1, col: 6, row: 6 },
    { id: "56", value: 2, col: 7, row: 6 },

    // Row 7
    { id: "57", value: 3, col: 0, row: 7 },
    { id: "58", value: 4, col: 1, row: 7 },
    { id: "59", value: 3, col: 2, row: 7 },
    { id: "60", value: 7, col: 3, row: 7 },
    { id: "61", value: 3, col: 4, row: 7 },
    { id: "62", value: 5, col: 5, row: 7 },
    { id: "63", value: 5, col: 6, row: 7 },
    { id: "64", value: 8, col: 7, row: 7 },
  ];

  // overscroll-contain - prevents refresh / scroll chaining on mobile
  // touch-none - disables all native touch panning so the pointer events fire immediately
  const DROP_IN_CLASSNAME_FIX_FOR_MOBILE = "overscroll-contain touch-none";
  return (
    <div
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
        {GAME_GRID_CELLS.map((gameGridCell: GameGridCellType) => (
          <div
            key={`gamegridcelldummy-${gameGridCell.id}`}
            id={gameGridCell.id}
            data-selectable
            className={clsx("flex items-center justify-center font-mono ", {
              "text-base-700 dark:text-base-400": !selectedSet.has(
                gameGridCell.id
              ),
              "bg-base-800 text-base-200 font-bold": selectedSet.has(
                gameGridCell.id
              ),
            })}
            style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
          >
            {gameGridCell.value}
          </div>
        ))}
      </div>
    </div>
  );
}
