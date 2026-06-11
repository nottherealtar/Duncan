import { PlayerLookup } from "@/components/api-hub/PlayerLookup";
import { hasApiToken } from "@/lib/clash-api";

export default function ApiHubPage() {
  const configured = hasApiToken();

  return (
    <div className="space-y-8">
      <section className="cr-panel p-6">
        <p className="text-sm font-bold tracking-widest text-cr-elixir uppercase">Layer 3</p>
        <h1 className="mt-2 text-3xl text-cr-gold sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          API Command Center
        </h1>
        <p className="mt-3 max-w-2xl text-cr-text-muted">
          Use your Clash Royale developer API token to scout any player, analyze recent battles,
          and sync their current battle deck into Duncan&apos;s deck viewer.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${configured ? "bg-cr-green" : "bg-cr-gold"}`} />
          <span className="text-sm text-cr-text-muted">
            {configured
              ? "API token configured — live data enabled"
              : "API token not set — add CLASH_ROYALE_API_TOKEN to enable live lookups"}
          </span>
        </div>
      </section>

      <section id="setup" className="cr-panel p-6">
        <h2 className="text-xl text-white" style={{ fontFamily: "var(--font-display)" }}>
          API Setup Guide
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-cr-text-muted">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cr-blue text-xs font-bold text-white">1</span>
            Go to <a href="https://developer.clashroyale.com" className="text-cr-blue-bright hover:underline" target="_blank" rel="noopener noreferrer">developer.clashroyale.com</a> and create an API key (same as in-game).
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cr-blue text-xs font-bold text-white">2</span>
            Whitelist your server IP, or use the RoyaleAPI proxy at <code className="text-cr-gold">proxy.royaleapi.dev</code>.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cr-blue text-xs font-bold text-white">3</span>
            Set <code className="text-cr-gold">CLASH_ROYALE_API_TOKEN</code> in your Vercel environment variables.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cr-blue text-xs font-bold text-white">4</span>
            Optionally set <code className="text-cr-gold">CLASH_ROYALE_PROXY_URL=https://proxy.royaleapi.dev/v1</code> for easier deployment.
          </li>
        </ol>
      </section>

      <PlayerLookup />
    </div>
  );
}
