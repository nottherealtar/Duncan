import Link from "next/link";
import { SITE_TREE } from "@/lib/site-tree";

const LAYERS = [
  {
    href: "/decks",
    layer: 2,
    title: "Deck Browser",
    desc: "Meta decks, builder & share codes",
    icon: "🃏",
    gradient: "from-[#e8b020] to-[#a87810]",
  },
  {
    href: "/api-hub",
    layer: 3,
    title: "Scout Center",
    desc: "Player stats & battle logs",
    icon: "📡",
    gradient: "from-[#ff3db8] to-[#c4007a]",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl px-4 py-8 text-center">
        <div className="absolute inset-0 cr-arena-bg opacity-90" />
        <div className="absolute -top-6 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-cr-blue-bright/10 blur-3xl" />
        <div className="relative">
          <p className="text-[10px] font-bold tracking-[0.35em] text-cr-blue-bright uppercase">
            Welcome Challenger
          </p>
          <h1 className="mt-2 text-5xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
            Duncan
          </h1>
          <p className="mx-auto mt-3 max-w-[280px] text-sm leading-relaxed text-cr-text-muted">
            Your pocket arena companion. Browse meta decks, build battle decks, scout players.
          </p>
          <div className="mt-6 text-6xl drop-shadow-lg">👑</div>
        </div>
      </section>

      {/* Layer cards */}
      <section className="space-y-2.5">
        <p className="px-1 text-xs font-bold tracking-wider text-cr-text-muted uppercase">
          Enter the Arena
        </p>
        {LAYERS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="cr-deck-surface flex items-center gap-4 p-4 active:scale-[0.98] transition-transform"
          >
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-2xl shadow-lg`}
            >
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-cr-blue-bright">Layer {item.layer}</p>
              <p className="text-lg text-white" style={{ fontFamily: "var(--font-display)" }}>
                {item.title}
              </p>
              <p className="text-xs text-cr-text-muted">{item.desc}</p>
            </div>
            <span className="text-cr-gold">›</span>
          </Link>
        ))}
      </section>

      {/* Features compact */}
      <section className="cr-deck-surface p-4">
        <p className="text-sm font-bold text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
          What You Get
        </p>
        <ul className="mt-3 space-y-2.5">
          {[
            "Ingame-style 2×4 deck with full-size cards",
            "One-tap share codes → open Clash Royale",
            "Daily meta deck pipeline from top players",
            "Live player scout via Supercell API",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-cr-text-muted">
              <span className="mt-0.5 text-cr-gold">◆</span>
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* PWA install hint */}
      <section className="rounded-2xl border border-cr-gem/30 bg-cr-gem/10 p-4 text-center">
        <p className="text-sm font-bold text-cr-gem" style={{ fontFamily: "var(--font-display)" }}>
          Add to Home Screen
        </p>
        <p className="mt-1 text-[11px] text-cr-text-muted">
          Install Duncan as a PWA for the full mobile arena experience.
        </p>
      </section>

      {/* Site tree compact */}
      <details className="cr-deck-surface p-4">
        <summary className="cursor-pointer text-sm font-bold text-cr-blue-bright" style={{ fontFamily: "var(--font-display)" }}>
          Site Map
        </summary>
        <div className="mt-3 space-y-3">
          {SITE_TREE.map((node) => (
            <div key={node.href}>
              <Link href={node.href} className="text-xs font-bold text-white">
                {node.title}
              </Link>
              {node.children && (
                <ul className="mt-1 space-y-0.5 pl-3">
                  {node.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="text-[10px] text-cr-text-muted">
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </details>

      <p className="text-center text-[9px] text-cr-text-muted/60">
        Fan project · Not affiliated with Supercell
      </p>
    </div>
  );
}
