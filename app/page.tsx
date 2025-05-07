import { GameProvider } from "@/providers/GameProvider";
import FruitBox from "@/components/FruitBox";

const DIM_ROW = 15;
const DIM_COL = 25;
const CELL_SIZE = 35;

export default function Home() {
  return (
    <div>
      <GameProvider col={DIM_COL} row={DIM_ROW} cellSize={CELL_SIZE}>
        <FruitBox />
      </GameProvider>
    </div>
  );
}
