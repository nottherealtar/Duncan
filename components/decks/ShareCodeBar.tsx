"use client";

import { useState } from "react";
import { buildDeckShareLink } from "@/lib/deck-utils";

interface ShareCodeBarProps {
  cardIds: number[];
  shareUrl?: string;
}

export function ShareCodeBar({ cardIds, shareUrl }: ShareCodeBarProps) {
  const [copied, setCopied] = useState(false);
  const link = shareUrl ?? buildDeckShareLink(cardIds);
  if (cardIds.length !== 8) return null;

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2">
      <button type="button" onClick={copy} className="cr-filter-btn flex-1 py-2.5 text-sm">
        {copied ? "Copied!" : "Copy Deck"}
      </button>
      <a href={link} className="cr-btn-ok flex flex-1 items-center justify-center py-2.5 text-sm" style={{ fontSize: "0.9rem" }}>
        Open in Game
      </a>
    </div>
  );
}
