import { Fruit } from "@/types";
import { CELL_SIZE } from "@/constants/config";
import clsx from "clsx";

export default function FruitCell({
  selected,
  fruit,
}: {
  selected: boolean;
  fruit: Fruit;
}) {
  return (
    <div
      id={fruit.id}
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
      {fruit.value}
    </div>
  );
}
