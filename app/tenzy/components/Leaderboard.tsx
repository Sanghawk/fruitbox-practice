import clsx from "clsx";
import { Score } from "@/app/tenzy/types";

function formatNumber(num: number): string {
  const str = num.toFixed(2);
  return str.replace(/\.?0+$/, "");
}
export default async function Leaderboard({ scores }: { scores: Score[] }) {
  return (
    <div className="">
      <h1 className="page-title mb-4">Tenzy Leaderboard</h1>
      <ol className="pl-0 flex flex-col gap-2">
        {scores.map((s, i) => (
          <li
            key={s.id}
            className={clsx("flex justify-between", {
              "text-md font-bold px-4 py-2 ring-1 ring-yellow-500/20 text-yellow-500 bg-yellow-500/10 rounded-md":
                i === 0,
              "text-md font-bold px-4 py-2 ring-1 ring-gray-500/20 text-gray-400 bg-gray-500/10 rounded-md":
                i === 1,
              "text-md font-bold px-4 py-2 ring-1 ring-amber-700/20 text-amber-700 bg-amber-700/10 rounded-md":
                i === 2,
            })}
          >
            <span>
              {i === 0 && "🥇"}
              {i === 1 && "🥈"}
              {i === 2 && "🥉"}
              {i > 2 && `${i + 1}.`} {s.user.name}
            </span>
            <span className="font-mono">
              {formatNumber(Number(s.value))} pts
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
