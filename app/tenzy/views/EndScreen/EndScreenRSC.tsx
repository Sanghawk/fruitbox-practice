import StartButtonRCC from "@/app/tenzy/components/StartButtonRCC";
import CtxConditionalRenderEndScreen from "./CtxConditionalRenderEndScreen";
import { SubmitScoreForm } from "@/app/tenzy/components/SubmitScoreForm";
import FinalScoreMessageRCC from "./FinalScoreMessageRCC";
import LeaderboardRSC from "@/app/tenzy/components/LeaderboardRSC";
import { API_BASE_URL } from "@/app/tenzy/constants/config";

export default async function EndScreenRSC() {
  const topScores = await fetch(`${API_BASE_URL}/api/score?limit=3`).then(
    (res) => res.json()
  );
  return (
    <CtxConditionalRenderEndScreen>
      <div className="sticky top-[64px] h-[calc(100dvh-64px)]">
        <div className="h-[calc(100dvh-64px)]">
          <div className="h-full mx-4 flex flex-col justify-center gap-4">
            <div>
              <div className="text-center mb-4">
                <h2 className="text-4xl font-bold">Game Over</h2>
              </div>
              <div className="flex flex-col gap-4">
                <FinalScoreMessageRCC />
                <div className="flex flex-col gap-2">
                  <p>Submit your score on the leaderboard:</p>
                  <SubmitScoreForm />
                </div>
              </div>

              <div className="mt-4">
                <LeaderboardRSC scores={topScores} />
              </div>
            </div>

            <div>
              <StartButtonRCC text="Play again" />
            </div>
          </div>
        </div>
      </div>
    </CtxConditionalRenderEndScreen>
  );
}
