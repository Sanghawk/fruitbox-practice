import StartButton from "@/components/StartButton";

export default function StartScreen() {
  return (
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
  );
}

function Instructions() {
  return (
    <div className="prose dark:prose-invert">
      <h3>How to play</h3>
      <p>
        Tenzy is a game where you have select numbers on a grid that sum to ten!
        Point are based on how many numbers on the grid you have cleared. You
        have 120 seconds to clear as many numbers as possible.
      </p>
      <p>Good luck!</p>
    </div>
  );
}
