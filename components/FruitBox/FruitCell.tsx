"use client";
import { Fruit } from "@/providers/GameProvider";
export default function FruitCell({
  selected,
  fruit,
}: {
  selected: boolean;
  fruit: Fruit;
}) {
  if (fruit.consumed) return <div className="w-[25px] h-[25px] bg-gray-200" />;
  return (
    <div
      id={fruit.id}
      data-selectable="true"
      className={`w-[25px] h-[25px] border-1 ${
        selected ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      {fruit.value}
    </div>
  );
}
