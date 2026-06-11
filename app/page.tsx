import { LayerCard } from "@/components/home/LayerCard";
import { FeatureBreakdown } from "@/components/home/FeatureBreakdown";
import { SITE_TREE } from "@/lib/site-tree";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section id="welcome" className="relative overflow-hidden rounded-3xl border border-cr-blue/30 bg-gradient-to-br from-cr-panel via-cr-bg-deep to-cr-bg">
        <div className="absolute inset-0 cr-diamond-bg opacity-50" />
        <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
          <p className="text-sm font-bold tracking-[0.3em] text-cr-blue-bright uppercase">
            Welcome to the Arena
          </p>
          <h1
            className="mt-4 text-5xl text-cr-gold sm:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Duncan
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-cr-text-muted">
            Your Clash Royale command center. Browse meta decks, build battle-ready compositions,
            and scout player stats — all styled like the arena you know.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/decks" className="cr-btn-gold">
              Browse Decks
            </Link>
            <Link href="/api-hub" className="cr-btn-blue">
              API Command Center
            </Link>
          </div>
        </div>
      </section>

      <section id="layers">
        <div className="mb-8 text-center">
          <h2 className="text-3xl text-white sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Choose Your Layer
          </h2>
          <p className="mt-2 text-cr-text-muted">
            Three layers, each built for a different kind of player.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <LayerCard
            layer={1}
            title="Home Base"
            subtitle="Navigation hub, feature overview, and the full site map. Your starting point in the arena."
            href="/"
            icon="🏰"
            accent="#4a9eff"
            delay={0}
          />
          <LayerCard
            layer={2}
            title="Deck Browser"
            subtitle="Daily meta deck pipeline, ingame-style deck viewer, share codes, and a full deck builder."
            href="/decks"
            icon="🃏"
            accent="#f6c443"
            delay={100}
          />
          <LayerCard
            layer={3}
            title="API Command Center"
            subtitle="Connect your in-game API key. Look up profiles, analyze battles, and sync your current deck."
            href="/api-hub"
            icon="📡"
            accent="#ff44cc"
            delay={200}
          />
        </div>
      </section>

      <FeatureBreakdown />

      <section className="cr-panel p-8 text-center">
        <h2 className="text-2xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
          Ready to Battle?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-cr-text-muted">
          Install Duncan as a PWA on your phone for quick deck imports and on-the-go stat checks.
          No app store required — just add to home screen.
        </p>
        <Link href="/decks" className="cr-btn-gold mt-6 inline-block">
          Enter the Arena
        </Link>
      </section>

      <section id="sitemap" className="cr-panel p-6">
        <h2 className="mb-4 text-xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
          Full Site Map
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {SITE_TREE.map((node) => (
            <div key={node.href}>
              <Link href={node.href} className="font-bold text-cr-blue-bright hover:text-cr-gold">
                {node.title}
              </Link>
              <p className="mt-1 text-xs text-cr-text-muted">{node.description}</p>
              {node.children && (
                <ul className="mt-2 space-y-1 text-sm">
                  {node.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="text-cr-text-muted hover:text-white">
                        → {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
