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
  champion?: boolean;
  empty?: boolean;
  onClick?: () => void;
  variant?: "deck" | "collection";
  index?: number;
}

export function CardSlot({
  card,
  level = 11,
  progress = 254,
  maxProgress = 1500,
  evolved = false,
  champion = false,
  empty = false,
  onClick,
  variant = "deck",
  index = 0,
}: CardSlotProps) {
  const isDeck = variant === "deck";
  const progressPct = Math.min(100, (progress / maxProgress) * 100);

  if (empty || !card) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="aspect-[72/96] w-full rounded-[5px] border-2 border-dashed border-[#3a7fc0]/40 bg-[#081428]/80"
      />
    );
  }

  const ring = evolved ? "cr-evolve-ring" : champion ? "cr-champion-ring" : "";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative aspect-[72/96] w-full rounded-[5px] p-[3px] ${cardFrameClass(card.rarity)} ${ring}`}
      style={{ boxShadow: "0 3px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.28)" }}
    >
      {(evolved || champion) && (
        <div className="absolute -top-1 left-1/2 z-30 -translate-x-1/2">
          <span
            className="cr-display flex h-4 w-4 items-center justify-center rounded-full text-[8px] text-white"
            style={{
              background: evolved
                ? "linear-gradient(180deg,#ff88dd,#e532d2)"
                : "linear-gradient(180deg,#ffe566,#cc9900)",
            }}
          >
            ◆
          </span>
        </div>
      )}

      <div className="relative h-full w-full overflow-hidden rounded-[3px] bg-[#0a1428]">
        <div className="absolute top-0 left-0 z-20 p-0.5">
          <ElixirDrop cost={card.elixir} size={isDeck ? "sm" : "xs"} />
        </div>

        <Image
          src={card.iconUrl}
          alt={card.name}
          fill
          unoptimized
          className="object-cover object-[center_15%] scale-[1.15]"
          sizes="(max-width: 430px) 25vw, 100px"
          priority={isDeck && index < 4}
        />

        <div
          className="absolute right-0 left-0 z-20 flex justify-center"
          style={{ bottom: isDeck ? 16 : 13 }}
        >
          <div
            className="cr-display w-[94%] rounded-sm py-0.5 text-center font-bold text-white"
            style={{
              fontSize: isDeck ? 8 : 7,
              background: "linear-gradient(180deg, #4db8ff, #2878c0)",
              boxShadow: "0 1px 0 #0a3058, inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            Level {level}
          </div>
        </div>

        <div className="absolute right-0 bottom-0 left-0 z-20 bg-black/75 px-0.5 pb-0.5 pt-0.5">
          <div className="h-[3px] overflow-hidden rounded-full bg-[#1a3050]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressPct}%`,
                background: progressPct >= 100
                  ? "linear-gradient(90deg,#33dd77,#22aa55)"
                  : "linear-gradient(90deg,#4db8ff,#2878c0)",
              }}
            />
          </div>
          {isDeck && (
            <p className="cr-display mt-0.5 text-center text-[6px] text-white/75">
              {progress}/{maxProgress}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
