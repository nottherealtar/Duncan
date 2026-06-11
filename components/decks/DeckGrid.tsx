"use client";

import type { Card } from "@/lib/types";
import { CardSlot } from "./CardSlot";
import { ElixirDrop } from "@/components/ui/ElixirDrop";
import { DeckStackIcon } from "@/components/ui/DeckStackIcon";
import { averageElixir } from "@/lib/cards";

interface DeckGridProps {
  cards: Card[];
  variant?: "deck" | "collection";
}

export function DeckGrid({ cards, variant = "deck" }: DeckGridProps) {
  const avg = averageElixir(cards.map((c) => c.id));
  const slots = [...cards];
  while (slots.length < 8) slots.push(undefined as unknown as Card);

  return (
    <div className="cr-deck-panel">
      <div className="grid grid-cols-4 gap-[2px]">
        {slots.slice(0, 8).map((card, i) => (
          <CardSlot
            key={card?.id ?? `e-${i}`}
            card={card}
            empty={!card}
            variant={variant}
            index={i}
            evolved={card?.rarity === "Legendary" && i === 0}
            champion={card?.rarity === "Legendary" && i === 1}
          />
        ))}
      </div>

      {cards.length > 0 && (
        <div className="mt-1 flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <ElixirDrop cost={avg} size="md" />
            <span className="cr-display text-2xl font-bold">{avg}</span>
          </div>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: "linear-gradient(180deg,#3a9de8,#1a5a99)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 0 #0a3058",
            }}
          >
            <DeckStackIcon className="h-5 w-5" />
          </div>
        </div>
      )}
    </div>
  );
}
