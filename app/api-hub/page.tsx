import { PlayerLookup } from "@/components/api-hub/PlayerLookup";
import { hasApiToken } from "@/lib/clash-api";

export default function ApiHubPage() {
  const configured = hasApiToken();

  return (
    <div className="flex flex-col gap-3 pb-4">
      <section className="cr-deck-surface p-4">
        <p className="text-[10px] font-bold tracking-wider text-cr-elixir uppercase">Layer 3</p>
        <h1 className="mt-1 text-2xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
          Scout Center
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-cr-text-muted">
          Look up any player tag. Pull trophies, clan, battle log, and sync their deck.
        </p>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-cr-bg-deep/60 px-3 py-2">
          <span className={`h-2 w-2 rounded-full ${configured ? "bg-cr-green" : "bg-cr-gold"}`} />
          <span className="text-[11px] text-cr-text-muted">
            {configured ? "API connected" : "Add API token in Vercel to enable live scout"}
          </span>
        </div>
      </section>

      <details className="cr-deck-surface p-4">
        <summary className="cursor-pointer text-xs font-bold text-cr-blue-bright" style={{ fontFamily: "var(--font-display)" }}>
          API Setup
        </summary>
        <ol className="mt-3 space-y-2 text-[11px] text-cr-text-muted">
          <li>1. Get token at developer.clashroyale.com</li>
          <li>2. Add CLASH_ROYALE_API_TOKEN in Vercel</li>
          <li>3. Optional: CLASH_ROYALE_PROXY_URL=proxy.royaleapi.dev/v1</li>
        </ol>
      </details>

      <PlayerLookup />
    </div>
  );
}
