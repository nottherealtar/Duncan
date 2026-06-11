"use client";

import Image from "next/image";
import type { Card } from "@/lib/types";
import { ElixirDrop } from "@/components/ui/ElixirDrop";
import { cardFrameClass } from "@/lib/card-styles";

interface CardSlotProps {
  card?: Card;
  level?: number;
  progress?: number;
  maxProgress?: number;
  evolved?: boolean;
  empty?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  variant?: "deck" | "collection" | "mini";
  index?: number;
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
  variant = "deck",
  index = 0,
}: CardSlotProps) {
  const isDeck = variant === "deck";
  const isMini = variant === "mini";
  const progressPct = Math.min(100, (progress / maxProgress) * 100);
  const ready = progressPct >= 100;

  if (empty || !card) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group relative w-full overflow-hidden rounded-lg border-2 border-dashed border-cr-blue-bright/30 bg-cr-bg-deep/50 ${
          isDeck ? "aspect-[88/118]" : isMini ? "aspect-[88/118]" : "aspect-[88/118]"
        }`}
        style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.4)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-light text-cr-blue-bright/30">+</span>
        </div>
      </button>
    );
  }

  const frame = cardFrameClass(card.rarity);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`animate-card-pop group relative w-full overflow-hidden rounded-lg ${frame} ${
        evolved ? "cr-evolve-ring" : ""
      } ${isDeck ? "aspect-[88/118]" : "aspect-[88/118]"}`}
      style={{
        animationDelay: `${index * 35}ms`,
        padding: isDeck ? "3px" : "2px",
        boxShadow: evolved
          ? undefined
          : "0 4px 8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
      }}
    >
      {evolved && (
        <div className="absolute top-0 left-1/2 z-30 -translate-x-1/2">
          <div
            className="flex h-4 w-4 items-center justify-center rounded-full text-[8px] text-white"
            style={{
              background: "linear-gradient(180deg, #ff8ee0, #ff3db8)",
              boxShadow: "0 0 8px rgba(255,79,216,0.8)",
            }}
          >
            ✦
          </div>
        </div>
      )}

      <div className="relative h-full w-full overflow-hidden rounded-[5px] bg-[#0a1628]">
        <div className="absolute top-0.5 left-0.5 z-20">
          <ElixirDrop cost={card.elixir} size={isDeck ? "sm" : "xs"} />
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
            className="absolute top-0.5 right-0.5 z-30 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-xs text-white"
          >
            ×
          </span>
        )}

        <div className="absolute inset-0">
          <Image
            src={card.iconUrl}
            alt={card.name}
            fill
            className="object-cover object-center scale-[1.08]"
            sizes={isDeck ? "110px" : "80px"}
            priority={isDeck && index < 4}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        </div>

        <div className="absolute right-0 bottom-0 left-0 z-20 px-1 pb-1">
          <p
            className={`text-center font-bold text-white drop-shadow-md ${
              isDeck ? "text-[10px]" : "text-[8px]"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Level {level}
          </p>
          <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-black/60 ring-1 ring-black/40">
            <div
              className={`h-full rounded-full ${ready ? "bg-cr-green" : "bg-cr-blue-bright"}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          {isDeck && (
            <p className="mt-0.5 text-center text-[7px] font-semibold text-white/70">
              {progress}/{maxProgress}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
