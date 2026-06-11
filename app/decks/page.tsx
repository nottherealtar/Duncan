import { DeckBrowser } from "@/components/decks/DeckBrowser";
import { loadDecksData } from "@/lib/deck-pipeline";

interface DecksPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function DecksPage({ searchParams }: DecksPageProps) {
  const params = await searchParams;
  const data = loadDecksData();
  const tab = (params.tab as "browser" | "popular" | "builder" | "import") ?? "browser";

  return (
    <DeckBrowser
      decks={data.decks}
      pipelineStatus={data.pipelineStatus}
      pipelineMessage={data.pipelineMessage}
      lastPipelineRun={data.lastPipelineRun}
      initialTab={tab}
    />
  );
}
