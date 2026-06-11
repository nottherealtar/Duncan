import cardsData from "@/data/cards.json";
import type { Card } from "./types";

export const CARDS: Card[] = cardsData.items as Card[];

/** Cards that can appear in the 8-card battle deck builder */
export const DECK_BUILDER_CARDS: Card[] = CARDS.filter((c) => c.deckEligible !== false);

const cardById = new Map(CARDS.map((c) => [c.id, c]));
const cardByName = new Map(CARDS.map((c) => [c.name.toLowerCase(), c]));

export function getCardById(id: number): Card | undefined {
  return cardById.get(id);
}

export function getCardByName(name: string): Card | undefined {
  return cardByName.get(name.toLowerCase());
}

export function getCardsByIds(ids: number[]): Card[] {
  return ids.map((id) => getCardById(id)).filter((c): c is Card => Boolean(c));
}

export function averageElixir(ids: number[]): number {
  const cards = getCardsByIds(ids);
  if (!cards.length) return 0;
  const total = cards.reduce((sum, c) => sum + c.elixir, 0);
  return Math.round((total / cards.length) * 10) / 10;
}

export function sortCards(cards: Card[], sortBy: "elixir" | "name" | "rarity"): Card[] {
  const rarityOrder = { Common: 0, Rare: 1, Epic: 2, Legendary: 3, Champion: 4 };
  return [...cards].sort((a, b) => {
    if (sortBy === "elixir") return a.elixir - b.elixir || a.name.localeCompare(b.name);
    if (sortBy === "rarity") return rarityOrder[a.rarity] - rarityOrder[b.rarity] || a.elixir - b.elixir;
    return a.name.localeCompare(b.name);
  });
}
