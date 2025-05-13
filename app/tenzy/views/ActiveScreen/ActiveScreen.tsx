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
        <div
          className="mx-auto h-full"
          style={{ width: `${BOARD_COLS * CELL_SIZE}px` }}
        >
          <div className="h-full flex flex-col justify-around gap-4">
            <div className="flex flex-col justify-center gap-4 flex-1">
              <div className="flex flex-row justify-between items-end">
                <GameScore />
                <ResetButton />
              </div>
              <div>
                <TimeLeft />
                <GameGrid />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CtxConditionalRenderActiveScreen>
  );
}
