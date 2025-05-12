import { Suspense } from "react";
import { StartScreen, ActiveScreen, EndScreen } from "./views";

export default function RootGameEntry() {
  return (
    <div>
      <Suspense fallback={null}>
        <StartScreen />
      </Suspense>
      <Suspense fallback={null}>
        <ActiveScreen />
      </Suspense>
      <Suspense fallback={null}>
        <EndScreen />
      </Suspense>
    </div>
  );
}
