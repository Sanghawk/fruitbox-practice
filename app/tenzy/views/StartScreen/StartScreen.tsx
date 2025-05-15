import StartButton from "@/app/tenzy/components/StartButton";
import CtxConditionalRenderStartScreen from "./CtxConditionalRenderStartScreen";
import Link from "next/link";

export default function StartScreen() {
  return (
    <CtxConditionalRenderStartScreen>
      <div className="sticky top-[64px] h-[calc(100dvh-64px)]">
        <div className="h-[calc(100dvh-64px)]">
          <div className="h-full mx-4 flex flex-col justify-center gap-4">
            <div>
              <div className="text-center mb-4">
                <h1 className="page-title">Tenzy</h1>
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
      <p>Select smart, select fast, and aim for high scores!</p>
    </div>
  );
}

function TenzyDescription() {
  return (
    <div>
      <p>
        Tenzy is a fast-paced number game where you select groups of numbers on
        an 8x8 grid that add up{" "}
        <span className="font-extrabold">exactly to 10</span> . You have{" "}
        <span className="font-extrabold">90 seconds</span> to clear as many
        cells as possible! Points depend on the number of cells selected and the
        shape of your selection.{" "}
        <span className="font-extrabold">More cells = more points</span>.
      </p>
    </div>
  );
}

export function TenzyGameCard() {
  return (
    <div className="p-8 ring-1 ring-base-200 dark:ring-base-900 text-base-900 dark:text-base-50 rounded-md px-2 py-1">
      <div className="flex flex-col justify-between p-4">
        <div className="text-left mb-4">
          <h2 className="page-title">Tenzy</h2>
        </div>
        <Instructions />
        <div></div>
        <div className="flex justify-end">
          <div className="flex gap-2">
            <Link className="px-5 py-2.5 btn btn-sm btn-primary" href="/tenzy">
              Play Tenzy!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
