"use client";

import type { Card } from "@/lib/types";
import { CardSlot } from "./CardSlot";
import { ElixirDrop } from "@/components/ui/ElixirDrop";
import { averageElixir } from "@/lib/cards";

interface DeckGridProps {
  cards: Card[];
  showStats?: boolean;
  slotSize?: "deck" | "collection";
  onCardClick?: (index: number) => void;
  onCardRemove?: (index: number) => void;
  emptySlots?: number;
  showLevels?: boolean;
  levels?: number[];
}

export function DeckGrid({
  cards,
  showStats = true,
  slotSize = "deck",
  onCardClick,
  onCardRemove,
  emptySlots = 0,
  showLevels = false,
  levels,
}: DeckGridProps) {
  const avg = averageElixir(cards.map((c) => c.id));
  const slots = [...cards];
  while (slots.length < 8) slots.push(undefined as unknown as Card);

  return (
    <div className="cr-diamond-bg rounded-2xl border border-cr-blue/30 p-4">
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {slots.slice(0, 8).map((card, i) => (
          <CardSlot
            key={card?.id ?? `empty-${i}`}
            card={card}
            empty={!card}
            size={slotSize}
            showLevel={showLevels && Boolean(card)}
            level={levels?.[i]}
            onClick={onCardClick ? () => onCardClick(i) : undefined}
            onRemove={onCardRemove && card ? () => onCardRemove(i) : undefined}
          />
        ))}
      </div>

      {showStats && cards.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ElixirDrop cost={avg} size="lg" />
            <div>
              <p className="text-xs text-cr-text-muted">Average Elixir</p>
              <p className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {avg}
              </p>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cr-panel-light/80 text-lg">
            🛡️
          </div>
        </div>
      )}

      {emptySlots > 0 && (
        <p className="mt-2 text-center text-sm text-cr-gold">
          {8 - cards.length} slot{8 - cards.length !== 1 ? "s" : ""} remaining
        </p>
      )}
    </div>
  );
}
