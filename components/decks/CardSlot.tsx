"use client";

import Image from "next/image";
import type { Card } from "@/lib/types";
import { ElixirDrop } from "@/components/ui/ElixirDrop";
import { rarityColor } from "@/lib/deck-utils";

interface CardSlotProps {
  card?: Card;
  empty?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  size?: "deck" | "collection";
  showLevel?: boolean;
  level?: number;
}

export function CardSlot({
  card,
  empty = false,
  onClick,
  onRemove,
  size = "deck",
  showLevel = false,
  level = 11,
}: CardSlotProps) {
  const isCollection = size === "collection";

  if (empty || !card) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group relative flex flex-col overflow-hidden rounded-xl border-2 border-dashed border-cr-blue/50 bg-cr-bg-deep/60 transition hover:border-cr-gold/60 hover:bg-cr-panel/40 ${
          isCollection ? "aspect-[3/4] w-full" : "aspect-[3/4.2] w-full"
        }`}
      >
        <div className="flex flex-1 items-center justify-center text-cr-text-muted">
          <span className="text-3xl opacity-40 group-hover:opacity-70">+</span>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col overflow-hidden rounded-xl border-2 border-transparent shadow-lg transition hover:scale-[1.02] ${
        isCollection ? "aspect-[3/4] w-full" : "aspect-[3/4.2] w-full"
      }`}
      style={{
        boxShadow: `0 4px 12px rgba(0,0,0,0.5), inset 0 0 0 2px ${rarityColor(card.rarity)}40`,
      }}
    >
      <div className="absolute top-1.5 left-1.5 z-10">
        <ElixirDrop cost={card.elixir} size="sm" />
      </div>

      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          onKeyDown={(e) => e.key === "Enter" && onRemove()}
          className="absolute top-1.5 right-1.5 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition group-hover:opacity-100"
          aria-label={`Remove ${card.name}`}
        >
          ×
        </span>
      )}

      <div className="relative flex-1 bg-gradient-to-b from-cr-panel-light to-cr-bg-deep">
        <Image
          src={card.iconUrl}
          alt={card.name}
          fill
          className="object-contain p-1 pt-4"
          sizes="120px"
          unoptimized
        />
      </div>

      <div className="relative z-10 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-1.5 pt-2 pb-1.5">
        <p
          className="truncate text-center text-[10px] font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {showLevel ? `Lv. ${level}` : card.name}
        </p>
      </div>
    </button>
  );
}
