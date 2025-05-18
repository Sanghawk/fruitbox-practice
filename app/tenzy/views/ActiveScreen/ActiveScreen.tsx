import ResetButton from "@/app/tenzy/components/ResetButton";
import CtxConditionalRenderActiveScreen from "./CtxConditionalRenderActiveScreen";
import { BOARD_COLS, CELL_SIZE } from "@/app/tenzy/constants/config";
import TimeLeft from "@/app/tenzy/components/TimeLeft";
import GameScore from "@/app/tenzy/components/GameScore";
import GameGrid from "@/app/tenzy/components/GameGrid";
export default function ActiveScreen() {
  return (
    <CtxConditionalRenderActiveScreen>
      <div className="min-h-full flex flex-col justify-center items-center py-4 gap-4">
        <div
          className=" flex flex-row w-full justify-between items-end"
          style={{ maxWidth: `${BOARD_COLS * CELL_SIZE}px` }}
        >
          <GameScore />
          <ResetButton />
        </div>
        <div style={{ width: `${BOARD_COLS * CELL_SIZE}px` }}>
          <div className="flex flex-col">
            <TimeLeft />
            <GameGrid />
          </div>
        </div>
      </div>
    </CtxConditionalRenderActiveScreen>
  );
}
