"use client";
import { Fruit } from "@/providers/GameProvider";
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
      data-selectable="true"
      className={`w-[50px] h-[50px] border-1 ${
        selected ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      {fruit.value}
    </div>
  );
}
