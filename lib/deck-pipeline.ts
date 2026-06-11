import { readFileSync, writeFileSync } from "fs";
import path from "path";
import type { DeckEntry, DecksData } from "./types";
import { averageElixir } from "./cards";
import { buildDeckShareLink } from "./deck-utils";
import { fetchBattleLog, fetchTopPlayers, hasApiToken } from "./clash-api";

const DECKS_PATH = path.join(process.cwd(), "data", "decks.json");
const CACHE_PATH = path.join("/tmp", "duncan-decks-cache.json");

function getWritablePath(): string {
  try {
    writeFileSync(CACHE_PATH, "", { flag: "a" });
    return CACHE_PATH;
  } catch {
    return DECKS_PATH;
  }
}

export function loadDecksData(): DecksData {
  try {
    if (CACHE_PATH !== DECKS_PATH) {
      const cached = readFileSync(CACHE_PATH, "utf8");
      return JSON.parse(cached) as DecksData;
    }
  } catch {
    // fall through to default
  }
  const raw = readFileSync(DECKS_PATH, "utf8");
  return JSON.parse(raw) as DecksData;
}

export function saveDecksData(data: DecksData): void {
  const target = getWritablePath();
  writeFileSync(target, JSON.stringify(data, null, 2));
}

function deckKey(ids: number[]): string {
  return [...ids].sort((a, b) => a - b).join("-");
}

export async function runDeckPipeline(): Promise<DecksData> {
  const existing = loadDecksData();
  const deckMap = new Map<string, DeckEntry>();

  for (const deck of existing.decks) {
    deckMap.set(deckKey(deck.cardIds), deck);
  }

  if (!hasApiToken()) {
    return {
      ...existing,
      lastPipelineRun: new Date().toISOString(),
      pipelineStatus: "success",
      pipelineMessage: "API token not set — serving curated meta decks.",
    };
  }

  try {
    const topPlayers = await fetchTopPlayers(30);
    let discovered = 0;

    for (const player of topPlayers.slice(0, 15)) {
      try {
        const battles = await fetchBattleLog(player.tag.replace("#", "%23"));
        for (const battle of battles.slice(0, 5)) {
          const team = battle.team?.[0];
          if (!team?.cards?.length) continue;

          const cardIds = team.cards.map((c) => c.id).filter(Boolean);
          if (cardIds.length !== 8) continue;

          const key = deckKey(cardIds);
          if (deckMap.has(key)) continue;

          const entry: DeckEntry = {
            id: `pipeline-${key}`,
            name: `${player.name}'s Deck`,
            archetype: "Ladder",
            cardIds,
            avgElixir: averageElixir(cardIds),
            popularity: Math.max(60, 100 - discovered * 2),
            shareCode: buildDeckShareLink(cardIds),
            source: "pipeline",
            updatedAt: new Date().toISOString(),
            tags: ["pipeline", "ladder", player.tag],
          };

          deckMap.set(key, entry);
          discovered++;
          if (discovered >= 12) break;
        }
      } catch {
        continue;
      }
      if (discovered >= 12) break;
    }

    const decks = [...deckMap.values()].sort((a, b) => b.popularity - a.popularity);

    const result: DecksData = {
      decks,
      lastPipelineRun: new Date().toISOString(),
      pipelineStatus: "success",
      pipelineMessage: `Pipeline discovered ${discovered} new decks from top player battle logs.`,
    };

    saveDecksData(result);
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown pipeline error";
    const result: DecksData = {
      ...existing,
      lastPipelineRun: new Date().toISOString(),
      pipelineStatus: "error",
      pipelineMessage: message,
    };
    saveDecksData(result);
    return result;
  }
}
