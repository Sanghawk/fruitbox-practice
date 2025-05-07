import { GameProvider } from "@/context/GameContext";
import RootGameEntry from "@/app/components/RootGameEntry";

export default function Home() {
  return (
    <div>
      <GameProvider>
        <RootGameEntry />
      </GameProvider>
    </div>
  );
}
