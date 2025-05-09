import { StartScreen, ActiveScreen, EndScreen } from "./views";

export default function RootGameEntry() {
  return (
    <div>
      <StartScreen />
      <ActiveScreen />
      <EndScreen />
    </div>
  );
}
