import { Score } from "@/app/tenzy/types";
import clsx from "clsx";
import { formatScore } from "@/app/tenzy/utils/formatScore";
interface FixedScoreListProps {
  scores: Score[];
}

export default function FixedScoreList({ scores }: FixedScoreListProps) {
  return (
    <ol className="flex flex-col gap-2">
      {scores.map((s, i) => (
        <li
          key={s.id}
          className={clsx("flex justify-between", {
            "text-md font-bold px-4 py-2 ring-1 ring-yellow-500/20 text-yellow-600 dark:text-yellow-500 bg-yellow-500/10  rounded-md":
              i === 0,
            "text-md font-bold px-4 py-2 ring-1 ring-gray-500/20 text-gray-700 dark:text-gray-400 bg-gray-500/10 rounded-md":
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
          <span className="font-mono">{formatScore(Number(s.value))} pts</span>
        </li>
      ))}
    </ol>
  );
}
