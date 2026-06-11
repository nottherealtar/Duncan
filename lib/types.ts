export interface Card {
  id: number;
  name: string;
  maxLevel: number;
  elixir: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Champion";
  iconUrl: string;
  type: "troop" | "spell" | "building";
}

export interface DeckEntry {
  id: string;
  name: string;
  archetype: string;
  cardIds: number[];
  avgElixir: number;
  winRate?: number;
  usageRate?: number;
  popularity: number;
  shareCode: string;
  source: "meta" | "pipeline" | "community";
  updatedAt: string;
  tags: string[];
}

export interface DecksData {
  decks: DeckEntry[];
  lastPipelineRun: string;
  pipelineStatus: "idle" | "running" | "success" | "error";
  pipelineMessage?: string;
}

export interface PlayerProfile {
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
  currentDeck?: Array<{ name: string; level: number; maxLevel: number; iconUrl?: string; count: number }>;
  cards?: Array<{ name: string; level: number; maxLevel: number; iconUrl?: string; count: number }>;
  arena?: { id: number; name: string };
}

export interface BattleLogEntry {
  type: string;
  battleTime: string;
  team: Array<{ tag: string; name: string; crowns: number; cards: Array<{ name: string; id: number }> }>;
  opponent: Array<{ tag: string; name: string; crowns: number; cards: Array<{ name: string; id: number }> }>;
}
