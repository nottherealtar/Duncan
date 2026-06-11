import { PlayerProfileView } from "@/components/scout/PlayerProfileView";
import { fetchBattleLog, fetchPlayer } from "@/lib/clash-api";
import { normalizePlayerTag } from "@/lib/validate-tag";
import { userFacingApiError } from "@/lib/api-errors";

interface PlayerPageProps {
  params: Promise<{ tag: string }>;
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { tag: rawTag } = await params;
  const tag = normalizePlayerTag(`#${rawTag}`);

  if (!tag) {
    return (
      <PlayerProfileView
        initialTag={`#${rawTag}`}
        initialError="Invalid player tag format."
      />
    );
  }

  try {
    const [player, battles] = await Promise.all([
      fetchPlayer(tag),
      fetchBattleLog(tag).catch(() => []),
    ]);

    return (
      <PlayerProfileView
        initialTag={tag}
        initialPlayer={player}
        initialBattles={battles.slice(0, 10)}
      />
    );
  } catch (error) {
    return (
      <PlayerProfileView
        initialTag={tag}
        initialError={userFacingApiError(error)}
      />
    );
  }
}
