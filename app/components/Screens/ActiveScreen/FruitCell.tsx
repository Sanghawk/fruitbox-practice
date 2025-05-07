import { Fruit } from "@/types";
import { CELL_SIZE } from "@/constants/config";

export default function FruitCell({
  selected,
  fruit,
}: {
  selected: boolean;
  fruit: Fruit;
}) {
  if (fruit.consumed)
    return (
      <div
        className="border-1"
        style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
      />
    );
  return (
    <div
      id={fruit.id}
      data-selectable="true"
      className={`border-1 ${selected && "bg-blue-500 text-white"}`}
      style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
    >
      {fruit.value}
    </div>
  );
}
