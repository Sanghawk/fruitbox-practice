import ResetButton from "@/app/tenzy/components/ResetButton";
import CtxConditionalRenderActiveScreen from "./CtxConditionalRenderActiveScreen";
import { BOARD_COLS, CELL_SIZE } from "@/app/tenzy/constants/config";
import TimeLeft from "@/app/tenzy/components/TimeLeft";
import GameScore from "@/app/tenzy/components/GameScore";
import GameGrid from "@/app/tenzy/components/GameGrid";
export default function ActiveScreen() {
  return (
    <CtxConditionalRenderActiveScreen>
      <div className="sticky top-[64px] h-[calc(100dvh-64px)] ">
        <div className="h-full flex flex-col justify-center gap-4">
          <div
            className="mx-auto"
            style={{ width: `${BOARD_COLS * CELL_SIZE}px` }}
          >
            <ResetButton />
          </div>
          <GameGrid />
          <div
            className="mx-auto"
            style={{ width: `${BOARD_COLS * CELL_SIZE}px` }}
          >
            <div className="flex flex-row justify-between">
              <div>
                <GameScore />
              </div>
              <TimeLeft />
            </div>
          </div>
        </div>
      </div>
    </CtxConditionalRenderActiveScreen>
  );
}
