import { GameProvider } from "./context/GameContext";
import RootGameEntry from "./RootGameEntry";

export default function Tenzy() {
  return (
    <GameProvider>
      <RootGameEntry />
    </GameProvider>
  );
}
