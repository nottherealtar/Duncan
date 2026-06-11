"use client";

import { useState } from "react";

interface ShareCodeBarProps {
  shareCode: string;
  deckName?: string;
}

export function ShareCodeBar({ shareCode, deckName }: ShareCodeBarProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cr-panel space-y-3 p-4">
      <h3 className="text-lg text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
        Import to Clash Royale
      </h3>
      {deckName && (
        <p className="text-sm text-cr-text-muted">
          Verified deck link for <span className="font-bold text-white">{deckName}</span>
        </p>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          readOnly
          value={shareCode}
          className="flex-1 rounded-lg border border-cr-blue/40 bg-cr-bg-deep px-3 py-2 text-sm text-cr-text-muted"
        />
        <button type="button" onClick={copyLink} className="cr-btn-blue whitespace-nowrap">
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
      <a href={shareCode} className="cr-btn-gold inline-block text-center">
        Open in Clash Royale
      </a>
      <p className="text-xs text-cr-text-muted">
        Tap &quot;Open in Clash Royale&quot; on mobile to import this deck directly into the game.
      </p>
    </div>
  );
}
