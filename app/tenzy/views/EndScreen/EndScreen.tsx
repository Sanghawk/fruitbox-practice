import StartButton from "@/app/tenzy/components/StartButton";
import CtxConditionalRenderEndScreen from "./CtxConditionalRenderEndScreen";
import { SubmitScoreForm } from "@/app/tenzy/components/SubmitScoreForm";
import FinalScoreMessage from "./FinalScoreMessage";
import { API_BASE_URL } from "@/app/tenzy/constants/config";
import { FixedScoreList } from "@/app/tenzy/components/Leaderboard";
export default async function EndScreen() {
  const res = await fetch(`${API_BASE_URL}/api/score?limit=3`, {
    next: { revalidate: 0 },
  });
  const topScores = await res.json();
  return (
    <CtxConditionalRenderEndScreen>
      <div className="min-h-full max-w-screen-sm flex flex-col gap-4 items-center justify-center py-4">
        <div className="w-full text-center mb-4">
          <h2 className="page-title">Game Over</h2>
        </div>
        <div className="w-full">
          <FinalScoreMessage />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p>Submit your score on the leaderboard:</p>
          <SubmitScoreForm />
        </div>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-xl font-extrabold">Tenzy Top 3</h3>

          <FixedScoreList scores={topScores.items} />
        </div>
        <StartButton text="Play again" />
      </div>
    </CtxConditionalRenderEndScreen>
  );
}
