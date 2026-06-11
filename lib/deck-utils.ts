import type { Card } from "./types";

export function buildDeckShareLink(cardIds: number[], locale = "en"): string {
  const deck = cardIds.join(";");
  return `https://link.clashroyale.com/deck/${locale}?deck=${deck}`;
}

export function buildDeckDeepLink(cardIds: number[]): string {
  return `clashroyale://copyDeck?deck=${cardIds.join(";")}`;
}

export function parseShareCode(input: string): number[] | null {
  const trimmed = input.trim();

  const urlMatch = trimmed.match(/deck=([0-9;]+)/i);
  if (urlMatch) {
    return urlMatch[1].split(";").map(Number).filter((n) => !Number.isNaN(n));
  }

  if (/^[0-9;]+$/.test(trimmed)) {
    const ids = trimmed.split(";").map(Number).filter((n) => !Number.isNaN(n));
    if (ids.length === 8) return ids;
  }

  return null;
}

export function validateDeck(cardIds: number[]): { valid: boolean; error?: string } {
  if (cardIds.length !== 8) {
    return { valid: false, error: "A battle deck must contain exactly 8 cards." };
  }
  const unique = new Set(cardIds);
  if (unique.size !== 8) {
    return { valid: false, error: "Each card must be unique in the deck." };
  }
  return { valid: true };
}

export function rarityColor(rarity: Card["rarity"]): string {
  switch (rarity) {
    case "Common":
      return "#b8c5d6";
    case "Rare":
      return "#f6a623";
    case "Epic":
      return "#c44dff";
    case "Legendary":
      return "#ffd700";
    case "Champion":
      return "#00e5ff";
    default:
      return "#b8c5d6";
  }
}
