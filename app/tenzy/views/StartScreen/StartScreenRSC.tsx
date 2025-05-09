import StartButton from "@/app/tenzy/components/StartButtonRCC";
import CtxConditionalRenderStartScreen from "./CtxConditionalRenderStartScreen";
import Link from "next/link";

export default function StartScreenRSC() {
  return (
    <CtxConditionalRenderStartScreen>
      <div className="sticky top-[64px] h-[calc(100dvh-64px)]">
        <div className="h-[calc(100dvh-64px)]">
          <div className="h-full mx-4 flex flex-col justify-center gap-4">
            <div>
              <div className="text-center mb-4">
                <h2 className="text-4xl font-bold">Tenzy</h2>
              </div>
              <Instructions />
            </div>

            <div>
              <StartButton />
            </div>
          </div>
        </div>
      </div>
    </CtxConditionalRenderStartScreen>
  );
}

function Instructions() {
  return (
    <div className="prose dark:prose-invert">
      <h3>How to play</h3>
      <p>
        Tenzy is a game where you have select numbers on a grid that sum to ten!
        Points are based on how many numbers on the grid you have cleared. You
        have 90 seconds to clear as many numbers as possible.
      </p>
      <p>
        View updates to the game <Link href="/tenzy/changelog">here</Link>
      </p>
      <p>Good luck!</p>
    </div>
  );
}
