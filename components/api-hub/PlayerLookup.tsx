"use client";

import { useState } from "react";
import type { BattleLogEntry, PlayerProfile } from "@/lib/types";
import { DeckGrid } from "@/components/decks/DeckGrid";
import { getCardByName, getCardsByIds } from "@/lib/cards";
import { ShareCodeBar } from "@/components/decks/ShareCodeBar";

export function PlayerLookup() {
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [battles, setBattles] = useState<BattleLogEntry[]>([]);

  const lookup = async () => {
    if (!tag.trim()) return;
    setLoading(true);
    setError("");
    setPlayer(null);
    setBattles([]);
    try {
      const encoded = encodeURIComponent(tag.trim());
      const [playerRes, battleRes] = await Promise.all([
        fetch(`/api/player/${encoded}`),
        fetch(`/api/player/${encoded}/battles`),
      ]);
      const playerData = await playerRes.json();
      if (!playerRes.ok) throw new Error(playerData.error ?? "Failed");
      setPlayer(playerData);
      if (battleRes.ok) {
        const battleData = await battleRes.json();
        setBattles(battleData.battles?.slice(0, 5) ?? []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Try again");
    } finally {
      setLoading(false);
    }
  };

  const winRate = player && player.battleCount > 0
    ? Math.round((player.wins / player.battleCount) * 100) : 0;

  const deckIds = player?.currentDeck
    ?.map((c) => getCardByName(c.name)?.id)
    .filter((id): id is number => Boolean(id)) ?? [];

  return (
    <div className="space-y-3">
      <div className="cr-deck-panel p-3">
        <div className="flex gap-2">
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="#TAG"
            className="flex-1 rounded-lg border border-[#2878c0]/50 bg-[#0a1830] px-3 py-2.5 font-mono text-sm uppercase text-white"
            onKeyDown={(e) => e.key === "Enter" && lookup()}
          />
          <button type="button" onClick={lookup} disabled={loading} className="cr-filter-btn px-4 text-sm disabled:opacity-50">
            {loading ? "..." : "Go"}
          </button>
        </div>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      {player && (
        <>
          <div className="cr-deck-panel p-3">
            <div className="flex justify-between">
              <div>
                <p className="cr-display text-lg font-bold">{player.name}</p>
                <p className="font-mono text-[10px] text-[#8aaee0]">{player.tag}</p>
              </div>
              <p className="cr-display text-2xl font-bold text-[#ffcc33]">{player.trophies.toLocaleString()}</p>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-1">
              {[
                { l: "Wins", v: player.wins },
                { l: "Loss", v: player.losses },
                { l: "Win%", v: `${winRate}%` },
                { l: "3👑", v: player.threeCrownWins },
              ].map((s) => (
                <div key={s.l} className="rounded-lg bg-[#0a1830] py-2 text-center">
                  <p className="cr-display text-sm font-bold">{typeof s.v === "number" ? s.v.toLocaleString() : s.v}</p>
                  <p className="text-[8px] text-[#8aaee0]">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          {deckIds.length === 8 && (
            <>
              <DeckGrid cards={getCardsByIds(deckIds)} />
              <ShareCodeBar cardIds={deckIds} />
            </>
          )}
          {battles.length > 0 && (
            <div className="cr-deck-panel p-3">
              <p className="cr-display mb-2 text-sm font-bold text-[#ffcc33]">Battles</p>
              {battles.map((b, i) => {
                const team = b.team?.[0];
                const opp = b.opponent?.[0];
                const won = (team?.crowns ?? 0) > (opp?.crowns ?? 0);
                return (
                  <div key={i} className="mb-1 rounded-lg bg-[#0a1830] px-2 py-1.5 text-[10px]">
                    <span className={won ? "text-[#33dd77]" : "text-red-400"}>{won ? "WIN" : "LOSS"}</span>
                    <span className="ml-2 text-[#8aaee0]">vs {opp?.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
