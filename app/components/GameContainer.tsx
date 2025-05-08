import { ReactNode } from "react";

export default function GameContainer({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto max-w-screen-sm">{children}</div>;
}
