import { PlayerLookup } from "@/components/api-hub/PlayerLookup";

export default function ApiHubPage() {
  return (
    <div className="flex flex-col gap-3 pb-4">
      <section className="cr-deck-surface p-4">
        <h1 className="text-2xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
          Scout Center
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-cr-text-muted">
          Look up any player tag for trophies, clan info, battle history, and their deck.
        </p>
      </section>

      <PlayerLookup />
    </div>
  );
}
