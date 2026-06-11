import { DeckBrowser } from "@/components/decks/DeckBrowser";
import { loadDecksData } from "@/lib/deck-pipeline";

interface DecksPageProps {
  searchParams: Promise<{ tab?: string }>;
}

const VALID_TABS = ["browser", "popular", "builder", "import"] as const;

export default async function DecksPage({ searchParams }: DecksPageProps) {
  const params = await searchParams;
  const data = loadDecksData();
  const tabParam = params.tab;
  const initialTab = VALID_TABS.includes(tabParam as (typeof VALID_TABS)[number])
    ? (tabParam as (typeof VALID_TABS)[number])
    : "browser";

  return <DeckBrowser decks={data.decks} initialTab={initialTab} />;
}
