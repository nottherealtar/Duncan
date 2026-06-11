const FEATURES = [
  {
    layer: 1,
    title: "Home & Navigation",
    color: "#4a9eff",
    items: [
      "Welcome hub with quick links to every section",
      "Card encyclopedia powered by official Supercell data",
      "Shareable player profiles for you and friends",
      "Full site map for easy discovery",
    ],
  },
  {
    layer: 2,
    title: "Decks",
    color: "#f6c443",
    items: [
      "Browse curated meta decks with win rates and tags",
      "One-tap import links for verified meta decks",
      "Interactive deck builder — add and remove cards freely",
      "Import decks shared from in-game or other sites",
    ],
  },
  {
    layer: 3,
    title: "Player Scout",
    color: "#ff44cc",
    items: [
      "Look up any player by tag — trophies, wins, clan",
      "View current battle deck with real card levels",
      "Recent battle log with win/loss results",
      "Shareable profile links for friends to use",
    ],
  },
];

export function FeatureBreakdown() {
  return (
    <section id="features" className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl text-cr-gold sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Everything You Need in the Arena
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-cr-text-muted">
          Build decks, study cards, and scout players — all in one place with an authentic Clash Royale feel.
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
