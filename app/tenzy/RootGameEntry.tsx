import Views from "./views";

export default function RootGameEntry() {
  return (
    <div>
      <Views.StartScreen />
      <Views.ActiveScreen />
      <Views.EndScreen />
    </div>
  );
}
