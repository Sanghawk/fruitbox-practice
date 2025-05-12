import { GameGridCell as GameGridCellType } from "@/app/tenzy/types";
import { CELL_SIZE } from "@/app/tenzy/constants/config";
import clsx from "clsx";

export default function GameGridCell({
  selected,
  gameGridCell,
}: {
  selected: boolean;
  gameGridCell: GameGridCellType;
}) {
  return (
    <div
      id={gameGridCell.id}
      data-selectable
      className={clsx(
        "flex items-center justify-center font-mono cursor-pointer",
        {
          "text-base-700 hover:text-base-900 dark:text-base-400 hover:dark:text-base-200":
            !selected,
          "bg-base-800 text-base-200 font-bold": selected,
        }
      )}
      style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
    >
      {gameGridCell.value}
    </div>
  );
}
