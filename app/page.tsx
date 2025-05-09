import { TenzyGameCard } from "@/app/tenzy/views/StartScreen/StartScreenRSC";
export default function Home() {
  return (
    <div className="relative mx-auto max-w-screen-lg h-full">
      <div className="mx-4">
        <div className="py-4 flex gap-2">
          <TenzyGameCard />
        </div>
      </div>
    </div>
  );
}
