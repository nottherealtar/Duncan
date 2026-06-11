import { DeckBrowser } from "@/components/decks/DeckBrowser";
import { loadDecksData } from "@/lib/deck-pipeline";

export default function DecksPage() {
  const data = loadDecksData();
  return <DeckBrowser decks={data.decks} />;
}
