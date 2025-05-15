import { DefaultTenzyScoring } from "./DefaultTenzyScoring";
import { ScoringStrategy } from "./ScoringStrategy";
import { TenzyScoringV2 } from "./TenzyScoringV2";

const strategies: Record<string, ScoringStrategy> = {
  default: new DefaultTenzyScoring(),
  v2: new TenzyScoringV2(),
  // register other strategies here
};

const mode = process.env.NEXT_PUBLIC_SCORE_MODE ?? "default";
export const scoringStrategy: ScoringStrategy =
  strategies[mode] ?? strategies["default"];
