export interface SiteNode {
  title: string;
  href: string;
  children?: SiteNode[];
  description?: string;
}

export const SITE_TREE: SiteNode[] = [
  {
    title: "Layer 1 — Home",
    href: "/",
    description: "Welcome, navigation, and feature overview",
    children: [
      { title: "Welcome & Introduction", href: "/#welcome" },
      { title: "Layer Navigation Cards", href: "/#layers" },
      { title: "Feature Breakdown", href: "/#features" },
      { title: "Footer & Site Map", href: "/#sitemap" },
    ],
  },
  {
    title: "Layer 2 — Deck Browser",
    href: "/decks",
    description: "Meta decks, share codes, and ingame-style deck builder",
    children: [
      { title: "Deck Browser Tab", href: "/decks?tab=browser" },
      { title: "Most Popular Decks Tab", href: "/decks?tab=popular" },
      { title: "Deck Builder", href: "/decks?tab=builder" },
      { title: "Share Code Importer", href: "/decks?tab=import" },
    ],
  },
  {
    title: "Layer 3 — API Command Center",
    href: "/api-hub",
    description: "Player lookup, battle log, and live stats via Supercell API",
    children: [
      { title: "Player Profile Lookup", href: "/api-hub#lookup" },
      { title: "Battle Log Analyzer", href: "/api-hub#battles" },
      { title: "Deck Sync from Profile", href: "/api-hub#deck-sync" },
      { title: "API Setup Guide", href: "/api-hub#setup" },
    ],
  },
];
