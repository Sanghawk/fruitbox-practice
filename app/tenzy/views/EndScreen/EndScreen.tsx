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
      <div className="sticky top-[64px] h-[calc(100dvh-64px)]">
        <div className="h-[calc(100dvh-64px)]">
          <div className="h-full mx-4 flex flex-col justify-center gap-4">
            <div>
              <div className="text-center mb-4">
                <h2 className="page-title">Game Over</h2>
              </div>
              <div className="flex flex-col gap-6">
                <FinalScoreMessage />
                <div className="flex flex-col gap-2">
                  <p>Submit your score on the leaderboard:</p>
                  <SubmitScoreForm />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-extrabold">Tenzy Top 3</h3>

                  <FixedScoreList scores={topScores.items} />
                </div>
              </div>
            </div>

            <div>
              <StartButton text="Play again" />
            </div>
          </div>
        </div>
      </div>
    </CtxConditionalRenderEndScreen>
  );
}
