"use client";

import { useState } from "react";
import { buildDeckDeepLink, buildDeckShareLink } from "@/lib/deck-utils";

interface ShareCodeBarProps {
  cardIds: number[];
}

export function ShareCodeBar({ cardIds }: ShareCodeBarProps) {
  const [copied, setCopied] = useState(false);
  const shareLink = buildDeckShareLink(cardIds);
  const deepLink = buildDeckDeepLink(cardIds);
  const valid = cardIds.length === 8;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!valid) return null;

  return (
    <div className="cr-deck-surface space-y-2.5 p-3">
      <p className="text-sm font-bold text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
        Share Deck
      </p>
      <div
        className="overflow-hidden rounded-xl border border-cr-blue/30 bg-cr-bg-deep/80 p-2.5 text-[11px] leading-snug break-all text-cr-text-muted"
      >
        {shareLink}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={copyLink} className="cr-btn-blue text-sm">
          {copied ? "Copied!" : "Copy"}
        </button>
        <a href={shareLink} className="cr-btn-gold flex items-center justify-center text-sm">
          Open Game
        </a>
      </div>
      <a href={deepLink} className="block text-center text-[11px] font-bold text-cr-blue-bright underline">
        Mobile deep link
      </a>
    </div>
  );
}
