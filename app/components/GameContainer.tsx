import { ReactNode } from "react";

function GameContainer({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto max-w-screen-xl">{children}</div>;
}

function ScreenContainer({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto max-w-screen-sm">{children}</div>;
}

export { GameContainer, ScreenContainer };
