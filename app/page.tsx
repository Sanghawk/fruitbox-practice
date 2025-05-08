import { GameProvider } from "@/context/GameContext";
import RootGameEntry from "@/app/components/RootGameEntry";
import clsx from "clsx";

export default function Home() {
  return (
    <main>
      <Header />
      <div>
        <GameProvider>
          <RootGameEntry />
        </GameProvider>
      </div>
    </main>
  );
}

function Header() {
  // Header styles
  const headerStyles = {
    position: "sticky top-0 left-0 right-0 z-50",
    dimensions: "h-[64px]",
    border: "border-b-[1px] border-base-200 dark:border-base-900",
    bgAndText: "base-bg-and-text",
  };

  return (
    <header
      className={clsx(
        headerStyles.position,
        headerStyles.dimensions,
        headerStyles.border,
        headerStyles.bgAndText
      )}
    >
      <div className="flex items-center h-full mx-4">
        <h1 className="text-2xl font-mono font-bold">while you wait</h1>
      </div>
    </header>
  );
}
