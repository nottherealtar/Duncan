"use client";

import { useState } from "react";
import { buildDeckShareLink } from "@/lib/deck-utils";

interface ShareCodeBarProps {
  cardIds: number[];
}

export function ShareCodeBar({ cardIds }: ShareCodeBarProps) {
  const [copied, setCopied] = useState(false);
  const shareLink = buildDeckShareLink(cardIds);
  const valid = cardIds.length === 8;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!valid) return null;

  return (
    <div className="cr-deck-surface p-3">
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={copyLink} className="cr-btn-blue text-sm">
          {copied ? "Copied!" : "Copy Deck"}
        </button>
        <a href={shareLink} className="cr-btn-gold flex items-center justify-center text-sm">
          Open in Game
        </a>
      </div>
    </div>
  );
}
