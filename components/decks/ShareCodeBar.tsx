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
    <div className="cr-panel space-y-3 p-4">
      <h3 className="text-lg text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
        Share Code
      </h3>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          readOnly
          value={shareLink}
          className="flex-1 rounded-lg border border-cr-blue/40 bg-cr-bg-deep px-3 py-2 text-sm text-cr-text-muted"
        />
        <button type="button" onClick={copyLink} className="cr-btn-blue whitespace-nowrap">
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={shareLink} className="cr-btn-gold inline-block text-center">
          Open in Clash Royale
        </a>
        <a href={deepLink} className="cr-btn-blue inline-block text-center">
          Deep Link (Mobile)
        </a>
      </div>
      <p className="text-xs text-cr-text-muted">
        Tap &quot;Open in Clash Royale&quot; on mobile to import this deck directly into the game.
      </p>
    </div>
  );
}
