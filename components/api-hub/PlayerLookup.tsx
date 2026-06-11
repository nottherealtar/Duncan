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
      if (!playerRes.ok) throw new Error(playerData.error ?? "Failed to fetch player");

      setPlayer(playerData);

      if (battleRes.ok) {
        const battleData = await battleRes.json();
        setBattles(battleData.battles?.slice(0, 5) ?? []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setLoading(false);
    }
  };

  const winRate = player && player.battleCount > 0
    ? Math.round((player.wins / player.battleCount) * 100)
    : 0;

  const deckIds =
    player?.currentDeck
      ?.map((c) => getCardByName(c.name)?.id)
      .filter((id): id is number => Boolean(id)) ?? [];

  return (
    <div className="space-y-3">
      <div className="cr-deck-surface p-4">
        <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Player Lookup
        </p>
        <div className="mt-3 flex gap-2">
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="#TAG"
            className="flex-1 rounded-xl border border-cr-blue/30 bg-cr-bg-deep px-3 py-3 font-mono text-sm uppercase"
            onKeyDown={(e) => e.key === "Enter" && lookup()}
          />
          <button
            type="button"
            onClick={lookup}
            disabled={loading}
            className="cr-btn-gold shrink-0 px-4 text-sm disabled:opacity-50"
          >
            {loading ? "..." : "Go"}
          </button>
        </div>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      {player && (
        <>
          <div className="cr-deck-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {player.name}
                </h3>
                <p className="font-mono text-[11px] text-cr-text-muted">{player.tag}</p>
                {player.clan && (
                  <p className="mt-1 truncate text-[11px] text-cr-blue-bright">{player.clan.name}</p>
                )}
              </div>
              <div className="shrink-0 text-right">
                <p className="text-3xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
                  {player.trophies.toLocaleString()}
                </p>
                <p className="text-[9px] text-cr-text-muted">Best {player.bestTrophies.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-1.5">
              {[
                { label: "Wins", value: player.wins },
                { label: "Losses", value: player.losses },
                { label: "Win%", value: `${winRate}%` },
                { label: "3👑", value: player.threeCrownWins },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-cr-bg-deep/70 py-2 text-center">
                  <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </p>
                  <p className="text-[8px] text-cr-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {deckIds.length === 8 && (
            <div className="space-y-2">
              <p className="px-1 text-xs font-bold text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
                Battle Deck
              </p>
              <DeckGrid cards={getCardsByIds(deckIds)} />
              <ShareCodeBar cardIds={deckIds} />
            </div>
          )}

          {battles.length > 0 && (
            <div className="cr-deck-surface p-4">
              <p className="mb-3 text-sm font-bold text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
                Recent Battles
              </p>
              <div className="space-y-2">
                {battles.map((battle, i) => {
                  const team = battle.team?.[0];
                  const opp = battle.opponent?.[0];
                  const won = (team?.crowns ?? 0) > (opp?.crowns ?? 0);
                  return (
                    <div key={i} className="rounded-lg bg-cr-bg-deep/60 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${won ? "text-cr-green" : "text-red-400"}`}>
                          {won ? "WIN" : "LOSS"}
                        </span>
                        <span className="text-[9px] text-cr-text-muted">
                          {team?.crowns ?? 0}-{opp?.crowns ?? 0}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-[10px] text-cr-text-muted">vs {opp?.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
