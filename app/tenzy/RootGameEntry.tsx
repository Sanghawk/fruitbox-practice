import { Suspense } from "react";
import { StartScreen, ActiveScreen, EndScreen } from "./views";

export default function RootGameEntry() {
  return (
    <>
      <Suspense fallback={null}>
        <StartScreen />
      </Suspense>
      <Suspense fallback={null}>
        <ActiveScreen />
      </Suspense>
      <Suspense fallback={null}>
        <EndScreen />
      </Suspense>
    </>
  );
}
