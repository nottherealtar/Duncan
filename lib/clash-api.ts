import type { BattleLogEntry, PlayerProfile } from "./types";
import { getCardByName } from "./cards";

const API_BASE = process.env.CLASH_ROYALE_API_URL ?? "https://api.clashroyale.com/v1";
const ROYALEAPI_PROXY = "https://proxy.royaleapi.dev/v1";

/** Vercel has no fixed IP — Supercell requires IP whitelist unless using RoyaleAPI proxy. */
export function getClashApiBase(): string {
  if (process.env.CLASH_ROYALE_PROXY_URL) {
    return process.env.CLASH_ROYALE_PROXY_URL;
  }
  if (process.env.VERCEL === "1") {
    return ROYALEAPI_PROXY;
  }
  return API_BASE;
}

export function getClashApiConfig() {
  const token = Boolean(process.env.CLASH_ROYALE_API_TOKEN?.trim());
  const base = getClashApiBase();
  const usingProxy = base !== API_BASE;
  const onVercel = process.env.VERCEL === "1";
  return { token, usingProxy, onVercel, base };
}

function encodeTag(tag: string): string {
  const cleaned = tag.replace(/^#/, "").toUpperCase();
  return encodeURIComponent(`#${cleaned}`);
}

async function clashFetch<T>(path: string): Promise<T> {
  const token = process.env.CLASH_ROYALE_API_TOKEN?.trim();
  if (!token) {
    throw new Error("CLASH_ROYALE_API_TOKEN is not configured. Add your developer API key from developer.clashroyale.com to Vercel environment variables.");
  }

  const base = getClashApiBase();
  const res = await fetch(`${base}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const body = await res.text();
    if (res.status === 403) {
      throw new Error("API access denied. Whitelist your server IP on developer.clashroyale.com or use the RoyaleAPI proxy.");
    }
    if (res.status === 404) {
      throw new Error("Player or resource not found. Check the player tag.");
    }
    throw new Error(`Clash Royale API error (${res.status}): ${body}`);
  }

  return res.json() as Promise<T>;
}

interface ApiPlayer {
  tag: string;
  name: string;
  trophies: number;
  bestTrophies: number;
  wins: number;
  losses: number;
  battleCount: number;
  threeCrownWins: number;
  challengeCardsWon: number;
  challengeMaxWins: number;
  tournamentCardsWon: number;
  tournamentBattleCount: number;
  role?: string;
  donations: number;
  donationsReceived: number;
  totalDonations: number;
  clan?: { tag: string; name: string };
  currentDeck?: Array<{ name: string; level: number; maxLevel: number; iconUrls?: { medium: string }; count: number }>;
  cards?: Array<{ name: string; level: number; maxLevel: number; iconUrls?: { medium: string }; count: number }>;
  arena?: { id: number; name: string };
}

export async function fetchPlayer(tag: string): Promise<PlayerProfile> {
  const data = await clashFetch<ApiPlayer>(`/players/${encodeTag(tag)}`);

  return {
    tag: data.tag,
    name: data.name,
    trophies: data.trophies,
    bestTrophies: data.bestTrophies,
    wins: data.wins,
    losses: data.losses,
    battleCount: data.battleCount,
    threeCrownWins: data.threeCrownWins,
    challengeCardsWon: data.challengeCardsWon,
    challengeMaxWins: data.challengeMaxWins,
    tournamentCardsWon: data.tournamentCardsWon,
    tournamentBattleCount: data.tournamentBattleCount,
    role: data.role,
    donations: data.donations,
    donationsReceived: data.donationsReceived,
    totalDonations: data.totalDonations,
    clan: data.clan,
    arena: data.arena,
    currentDeck: data.currentDeck?.map((c) => {
      const card = getCardByName(c.name);
      return {
        name: c.name,
        level: c.level,
        maxLevel: c.maxLevel,
        iconUrl: c.iconUrls?.medium ?? card?.iconUrl,
        count: c.count,
      };
    }),
    cards: data.cards?.slice(0, 12).map((c) => ({
      name: c.name,
      level: c.level,
      maxLevel: c.maxLevel,
      iconUrl: c.iconUrls?.medium ?? getCardByName(c.name)?.iconUrl,
      count: c.count,
    })),
  };
}

export async function fetchBattleLog(tag: string): Promise<BattleLogEntry[]> {
  return clashFetch<BattleLogEntry[]>(`/players/${encodeTag(tag)}/battlelog`);
}

interface RankingPlayer {
  tag: string;
  name: string;
  trophies: number;
}

export async function fetchTopPlayers(limit = 50): Promise<RankingPlayer[]> {
  const data = await clashFetch<{ items: RankingPlayer[] }>(
    `/locations/global/rankings/players?limit=${limit}`
  );
  return data.items;
}

export function hasApiToken(): boolean {
  return Boolean(process.env.CLASH_ROYALE_API_TOKEN);
}
