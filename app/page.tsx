import Link from "next/link";

const MODES = [
  {
    href: "/decks",
    title: "Deck Browser",
    desc: "Meta decks, builder & share codes",
    icon: "🃏",
    gradient: "from-[#e8b020] to-[#a87810]",
  },
  {
    href: "/api-hub",
    title: "Scout Center",
    desc: "Player stats & battle logs",
    icon: "📡",
    gradient: "from-[#ff3db8] to-[#c4007a]",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 pb-4">
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

      <section className="space-y-2.5">
        <p className="px-1 text-xs font-bold tracking-wider text-cr-text-muted uppercase">
          Enter the Arena
        </p>
        {MODES.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="cr-deck-surface flex items-center gap-4 p-4 transition-transform active:scale-[0.98]"
          >
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-2xl shadow-lg`}
            >
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg text-white" style={{ fontFamily: "var(--font-display)" }}>
                {item.title}
              </p>
              <p className="text-xs text-cr-text-muted">{item.desc}</p>
            </div>
            <span className="text-cr-gold">›</span>
          </Link>
        ))}
      </section>

      <section className="cr-deck-surface p-4">
        <p className="text-sm font-bold text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
          What You Get
        </p>
        <ul className="mt-3 space-y-2.5">
          {[
            "Ingame-style deck with full-size cards",
            "One-tap share codes to open Clash Royale",
            "Daily refreshed meta decks",
            "Player scout & battle history",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-cr-text-muted">
              <span className="mt-0.5 text-cr-gold">◆</span>
              {f}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
