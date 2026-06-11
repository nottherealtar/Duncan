"use client";

import type { Card } from "@/lib/types";
import { CardSlot } from "./CardSlot";
import { ElixirDrop } from "@/components/ui/ElixirDrop";
import { averageElixir } from "@/lib/cards";

interface DeckGridProps {
  cards: Card[];
  showStats?: boolean;
  variant?: "deck" | "collection";
  onCardClick?: (index: number) => void;
  onCardRemove?: (index: number) => void;
  emptySlots?: number;
}

export function DeckGrid({
  cards,
  showStats = true,
  variant = "deck",
  onCardClick,
  onCardRemove,
  emptySlots = 0,
}: DeckGridProps) {
  const avg = averageElixir(cards.map((c) => c.id));
  const slots = [...cards];
  while (slots.length < 8) slots.push(undefined as unknown as Card);

  return (
    <div className="cr-deck-surface">
      <div className="grid grid-cols-4 gap-1">
        {slots.slice(0, 8).map((card, i) => (
          <CardSlot
            key={card?.id ?? `empty-${i}`}
            card={card}
            empty={!card}
            variant={variant}
            index={i}
            evolved={card?.rarity === "Legendary" && i < 3}
            onClick={onCardClick ? () => onCardClick(i) : undefined}
            onRemove={onCardRemove && card ? () => onCardRemove(i) : undefined}
          />
        ))}
      </div>

      {showStats && (
        <div className="mt-2 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <ElixirDrop cost={avg} size="md" />
            <div>
              <p className="text-[9px] font-bold tracking-wider text-cr-text-muted uppercase">
                Avg Elixir
              </p>
              <p className="text-lg leading-none font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {cards.length ? avg : "—"}
              </p>
            </div>
          </div>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-base"
            style={{
              background: "linear-gradient(180deg, #2a6fc0, #1a4f8f)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            🛡️
          </div>
        </div>
      )}

      {emptySlots > 0 && (
        <p className="mt-1.5 text-center text-xs font-bold text-cr-gold">
          {8 - cards.length} more card{8 - cards.length !== 1 ? "s" : ""} needed
        </p>
      )}
    </div>
  );
}
