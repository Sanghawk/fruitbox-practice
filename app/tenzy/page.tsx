import { GameProvider } from "./context/GameContext";
import RootGameEntry from "./RootGameEntry";

export const revalidate = 0;
export default function Tenzy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "Tenzy",
    url: "https://www.whileinqueue.io/tenzy",
    description:
      "Tenzy is a game where you have select numbers on a grid that sum to ten!",
    gamePlatform: "Web",
    gameLocation: "https://www.whileinqueue.io/tenzy",
  };
  return (
    <GameProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RootGameEntry />
    </GameProvider>
  );
}
