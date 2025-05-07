"use client";
import { Fruit, useGameContext } from "@/providers/GameProvider";
export default function FruitCell({
  selected,
  fruit,
}: {
  selected: boolean;
  fruit: Fruit;
}) {
  const { cellSize } = useGameContext();
  if (fruit.consumed)
    return (
      <div
        className="border-1"
        style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
      />
    );
  return (
    <div
      id={fruit.id}
      data-selectable="true"
      className={`border-1 ${selected && "bg-blue-500 text-white"}`}
      style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
    >
      {fruit.value}
    </div>
  );
}
