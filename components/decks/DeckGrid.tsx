"use client";

import type { Card } from "@/lib/types";
import { CardSlot } from "./CardSlot";
import { ElixirDrop } from "@/components/ui/ElixirDrop";
import { averageElixir } from "@/lib/cards";

interface DeckGridProps {
  cards: Card[];
  onCardClick?: (index: number) => void;
  variant?: "deck" | "collection";
}

export function DeckGrid({ cards, onCardClick, variant = "deck" }: DeckGridProps) {
  const avg = averageElixir(cards.map((c) => c.id));
  const slots = [...cards];
  while (slots.length < 8) slots.push(undefined as unknown as Card);

  return (
    <div className="cr-deck-panel">
      <div className="grid grid-cols-4 gap-[3px]">
        {slots.slice(0, 8).map((card, i) => (
          <CardSlot
            key={card?.id ?? `e-${i}`}
            card={card}
            empty={!card}
            variant={variant}
            index={i}
            evolved={card?.rarity === "Legendary" && i === 0}
            champion={card?.rarity === "Legendary" && i === 1}
            onClick={onCardClick ? () => onCardClick(i) : undefined}
          />
        ))}
      </div>

      {cards.length > 0 && (
        <div className="mt-1.5 flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <ElixirDrop cost={avg} size="md" />
            <span className="cr-display text-xl font-bold text-white">{avg}</span>
          </div>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
            style={{
              background: "linear-gradient(180deg,#3a9de8,#1a5a99)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 0 #0a3058",
            }}
          >
            🛡️
          </div>
        </div>
      )}
    </div>
  );
}
