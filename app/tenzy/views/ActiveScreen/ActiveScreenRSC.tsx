import ResetButtonRCC from "@/app/tenzy/components/ResetButtonRCC";
import CtxConditionalRenderActiveScreen from "./CtxConditionalRenderActiveScreen";
import { BOARD_COLS, CELL_SIZE } from "@/app/tenzy/constants/config";
import TimeLeftRCC from "@/app/tenzy/components/TimeLeftRCC";
import GameScoreRCC from "@/app/tenzy/components/GameScoreRCC";
import GameGridRCC from "@/app/tenzy/components/GameGridRCC";
export default function ActiveScreenRSC() {
  return (
    <CtxConditionalRenderActiveScreen>
      <div className="sticky top-[64px] h-[calc(100dvh-64px)] ">
        <div className="h-full flex flex-col justify-center gap-4">
          <div
            className="mx-auto"
            style={{ width: `${BOARD_COLS * CELL_SIZE}px` }}
          >
            <ResetButtonRCC />
          </div>
          <GameGridRCC />
          <div
            className="mx-auto"
            style={{ width: `${BOARD_COLS * CELL_SIZE}px` }}
          >
            <div className="flex flex-row justify-between">
              <div>
                <GameScoreRCC />
              </div>
              <TimeLeftRCC />
            </div>
          </div>
        </div>
      </div>
    </CtxConditionalRenderActiveScreen>
  );
}
