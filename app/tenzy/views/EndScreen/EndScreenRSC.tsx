import StartButtonRCC from "@/app/tenzy/components/StartButtonRCC";
import CtxConditionalRenderEndScreen from "./CtxConditionalRenderEndScreen";
import ResultsRCC from "./ResultsRCC";

export default function EndScreenRSC() {
  return (
    <CtxConditionalRenderEndScreen>
      <div className="sticky top-[64px] h-[calc(100dvh-64px)]">
        <div className="h-[calc(100dvh-64px)]">
          <div className="h-full mx-4 flex flex-col justify-center gap-4">
            <div>
              <div className="text-center mb-4">
                <h2 className="text-4xl font-bold">Game Over</h2>
              </div>
              <ResultsRCC />
            </div>

            <div>
              <StartButtonRCC />
            </div>
          </div>
        </div>
      </div>
    </CtxConditionalRenderEndScreen>
  );
}
