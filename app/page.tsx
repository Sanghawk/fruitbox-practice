import { GameProvider } from "@/providers/GameProvider";
import FruitBox from "@/components/FruitBox";

const DIM_ROW = 10;
const DIM_COL = 10;

export default function Home() {
  return (
    <div>
      <GameProvider col={DIM_COL} row={DIM_ROW}>
        <FruitBox />
      </GameProvider>
    </div>
  );
}
