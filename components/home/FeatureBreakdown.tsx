const FEATURES = [
  {
    layer: 1,
    title: "Home & Navigation",
    color: "#4a9eff",
    items: [
      "Welcome hero with arena-themed styling",
      "Layer navigation cards for quick access",
      "Feature breakdown for each major layer",
      "Footer with full site tree map",
    ],
  },
  {
    layer: 2,
    title: "Deck Browser",
    color: "#f6c443",
    items: [
      "Daily pipeline fetches meta decks from top players",
      "Ingame-style 2×4 deck grid with elixir badges",
      "One-tap share codes that open Clash Royale",
      "Interactive deck builder with card collection",
    ],
  },
  {
    layer: 3,
    title: "API Command Center",
    color: "#ff44cc",
    items: [
      "Player profile lookup via your in-game API key",
      "Battle log analyzer with deck extraction",
      "Sync current deck from player profile",
      "Trophy stats, clan info, and win rates",
    ],
  },
];

export function FeatureBreakdown() {
  return (
    <section id="features" className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl text-cr-gold sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Three Layers, One Arena
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-cr-text-muted">
          Each layer targets a different player need — from discovery to deck building to live stats.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <div key={feature.layer} className="cr-panel p-6">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-cr-bg-deep"
                style={{ background: feature.color, fontFamily: "var(--font-display)" }}
              >
                L{feature.layer}
              </div>
              <h3 className="text-xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                {feature.title}
              </h3>
            </div>
            <ul className="mt-4 space-y-2">
              {feature.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-cr-text-muted">
                  <span className="mt-1 text-cr-gold">◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
