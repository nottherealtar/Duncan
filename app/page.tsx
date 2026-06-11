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
            Your Clash Royale companion. Browse meta decks, build your own compositions,
            learn every card from official data, and scout player stats.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/decks" className="cr-btn-gold">
              Browse Decks
            </Link>
            <Link href="/cards" className="cr-btn-blue">
              Card Encyclopedia
            </Link>
            <Link href="/scout" className="cr-btn-blue">
              Scout Players
            </Link>
          </div>
        </div>
      </section>

      <section id="layers">
        <div className="mb-8 text-center">
          <h2 className="text-3xl text-white sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Choose Your Path
          </h2>
          <p className="mt-2 text-cr-text-muted">
            Three focused areas — decks, cards, and player stats.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <LayerCard
            layer={1}
            title="Meta Decks"
            subtitle="Browse popular meta decks with win rates, tags, and one-tap import links. Build your own or import from in-game."
            href="/decks"
            icon="🃏"
            accent="#f6c443"
          />
          <LayerCard
            layer={2}
            title="Card Encyclopedia"
            subtitle="Every card with official elixir cost, rarity, type, and max level from the Supercell API."
            href="/cards"
            icon="📖"
            accent="#4a9eff"
          />
          <LayerCard
            layer={3}
            title="Player Scout"
            subtitle="Look up any player tag for trophies, battle stats, current deck, and recent battles. Share profiles with friends."
            href="/scout"
            icon="📡"
            accent="#ff44cc"
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
        </p>
        <Link href="/decks" className="cr-btn-gold mt-6 inline-block">
          Enter the Arena
        </Link>
      </section>

      <section id="sitemap" className="cr-panel p-6">
        <h2 className="mb-4 text-xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
          Site Map
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
