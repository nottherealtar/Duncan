export interface SiteNode {
  title: string;
  href: string;
  children?: SiteNode[];
  description?: string;
}

export const SITE_TREE: SiteNode[] = [
  {
    title: "Home",
    href: "/",
    description: "Welcome hub and site overview",
    children: [
      { title: "Welcome", href: "/#welcome" },
      { title: "Feature Overview", href: "/#features" },
      { title: "Site Map", href: "/#sitemap" },
    ],
  },
  {
    title: "Decks",
    href: "/decks",
    description: "Meta decks, deck builder, and import",
    children: [
      { title: "Browse Meta Decks", href: "/decks?tab=browser" },
      { title: "Most Popular", href: "/decks?tab=popular" },
      { title: "Deck Builder", href: "/decks?tab=builder" },
      { title: "Import Deck", href: "/decks?tab=import" },
    ],
  },
  {
    title: "Cards",
    href: "/cards",
    description: "Official card data from Supercell API",
    children: [
      { title: "All Cards", href: "/cards" },
    ],
  },
  {
    title: "Player Scout",
    href: "/scout",
    description: "Player profiles, stats, and battle log",
    children: [
      { title: "Player Lookup", href: "/scout" },
    ],
  },
];
