import { PlayerLookup } from "@/components/api-hub/PlayerLookup";

export default function ApiHubPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <div className="grid grid-cols-2 gap-1">
        <a href="/decks" className="cr-display cr-mega-tab-off py-3.5 text-center text-base font-bold">
          Decks
        </a>
        <div className="cr-display cr-mega-tab-on py-3.5 text-center text-base font-bold">
          Scout
        </div>
      </div>
      <PlayerLookup />
      <div className="flex justify-center safe-bottom mt-2 px-6">
        <a href="/decks" className="cr-btn-ok text-center no-underline">
          OK
        </a>
      </div>
    </div>
  );
}
