"use client";

import Image from "next/image";
import type { Card } from "@/lib/types";
import { ElixirDrop } from "@/components/ui/ElixirDrop";
import { rarityColor } from "@/lib/deck-utils";

interface CardSlotProps {
  card?: Card;
  level?: number;
  progress?: number;
  maxProgress?: number;
  evolved?: boolean;
  empty?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  size?: "deck" | "collection";
}

export function CardSlot({
  card,
  level = 11,
  progress = 254,
  maxProgress = 1500,
  evolved = false,
  empty = false,
  onClick,
  onRemove,
  size = "deck",
}: CardSlotProps) {
  const isCollection = size === "collection";
  const progressPct = Math.min(100, (progress / maxProgress) * 100);
  const ready = progressPct >= 100;

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
      className={`group relative flex flex-col overflow-hidden rounded-xl border-2 transition hover:scale-[1.02] ${
        evolved
          ? "border-cr-pink shadow-[0_0_16px_rgba(255,110,180,0.5)]"
          : "border-transparent shadow-lg"
      } ${isCollection ? "aspect-[3/4] w-full" : "aspect-[3/4.2] w-full"}`}
      style={{
        boxShadow: evolved ? undefined : `0 4px 12px rgba(0,0,0,0.5), inset 0 0 0 2px ${rarityColor(card.rarity)}40`,
      }}
    >
      {evolved && (
        <div className="absolute top-1 left-1/2 z-20 -translate-x-1/2 rounded-full bg-cr-pink px-2 py-0.5 text-[10px] font-bold text-white">
          ✦
        </div>
      )}

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
        />
      </div>

      <div className="relative z-10 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-1.5 pt-4 pb-1">
        <p className="truncate text-center text-[10px] font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Level {level}
        </p>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/50">
          <div
            className={`h-full rounded-full transition-all ${ready ? "bg-cr-green" : "bg-cr-blue-bright"}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="mt-0.5 text-center text-[8px] text-cr-text-muted">
          {progress}/{maxProgress}
        </p>
      </div>
    </button>
  );
}
