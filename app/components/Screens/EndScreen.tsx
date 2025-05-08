"use client";
import StartButton from "@/components/StartButton";
import { useGameContext } from "@/context/GameContext";
export default function EndScreen() {
  return (
    <div className="sticky top-[64px] h-[calc(100dvh-64px)]">
      <div className="h-[calc(100dvh-64px)]">
        <div className="h-full mx-4 flex flex-col justify-center gap-4">
          <div>
            <div className="text-center mb-4">
              <h2 className="text-4xl font-bold">Game Over</h2>
            </div>
            <Results />
          </div>

          <div>
            <StartButton />
          </div>
        </div>
      </div>
    </div>
  );
}

const STUB_LEADERBOARD = [
  {
    id: 1,
    name: "John Doe",
    score: 100,
  },
  {
    id: 2,
    name: "Jane Doe",
    score: 90,
  },
  {
    id: 3,
    name: "John Doe",
    score: 70,
  },
];

function Results() {
  const { score } = useGameContext();
  return (
    <div className="prose dark:prose-invert">
      <h3>You scored {score} points</h3>
      <div>
        <h4>Leaderboard</h4>
        <ol>
          {STUB_LEADERBOARD.map((item) => (
            <li key={`${item.id}-${item.name}`}>
              <div className="flex flex-row justify-between">
                <p>{item.name}</p>
                <p>{item.score} points</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
