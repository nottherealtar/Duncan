import { PlayerLookup } from "@/components/api-hub/PlayerLookup";

export default function ApiHubPage() {
  return (
    <div className="flex flex-col gap-3 pb-4">
      <div className="cr-deck-panel p-4">
        <h1 className="cr-display text-2xl font-bold text-white">Scout</h1>
        <p className="mt-1 text-xs text-[#8aaee0]">Look up any player tag.</p>
      </div>
      <PlayerLookup />
    </div>
  );
}
