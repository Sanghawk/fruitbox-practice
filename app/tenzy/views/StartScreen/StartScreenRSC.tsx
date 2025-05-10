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
                <h1 className="text-4xl font-bold">Tenzy</h1>
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
      <TenzyDescription />
      <p>
        View updates to the game <Link href="/tenzy/changelog">here</Link>
      </p>
      <p>Good luck!</p>
    </div>
  );
}

function TenzyDescription() {
  return (
    <p>
      Tenzy is a game where you have select numbers on a grid that sum to ten!
      Points are based on how many numbers on the grid you have cleared. You
      have 90 seconds to clear as many numbers as possible.
    </p>
  );
}

export function TenzyGameCard() {
  return (
    <div className="p-8 ring-1 ring-base-200 dark:ring-base-900 text-base-900 dark:text-base-50 rounded-md px-2 py-1">
      <div className="flex flex-col justify-between p-4">
        <div className="text-left mb-4">
          <h2 className="text-4xl font-bold">Tenzy</h2>
        </div>
        <div className="text-sm">
          <TenzyDescription />
        </div>
        <div></div>
        <div className="flex justify-end">
          <div className="flex gap-2">
            <Link className="px-5 py-2.5 btn btn-sm btn-primary" href="/tenzy">
              Play
            </Link>
            <Link
              className="px-5 py-2.5 btn btn-sm btn-primary text-sm"
              href="/tenzy/leaderboard"
            >
              🏆
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
