import type { Card } from "./types";

export function cardFrameClass(rarity: Card["rarity"]): string {
  switch (rarity) {
    case "Rare":
      return "cr-card-frame-rare";
    case "Epic":
      return "cr-card-frame-epic";
    case "Legendary":
      return "cr-card-frame-legendary";
    case "Champion":
      return "cr-card-frame-champion";
    default:
      return "cr-card-frame-common";
  }
}
