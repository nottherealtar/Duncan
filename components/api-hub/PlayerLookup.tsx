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

  const winRate = player
    ? player.battleCount > 0
      ? Math.round((player.wins / player.battleCount) * 100)
      : 0
    : 0;

  const deckIds =
    player?.currentDeck
      ?.map((c) => getCardByName(c.name)?.id)
      .filter((id): id is number => Boolean(id)) ?? [];

  return (
    <div className="space-y-6">
      <div id="lookup" className="cr-panel p-6">
        <h2 className="text-2xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
          Player Profile Lookup
        </h2>
        <p className="mt-2 text-sm text-cr-text-muted">
          Enter your player tag (e.g. #ABC123) to pull live stats from the Supercell API.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="#PLAYERTAG"
            className="flex-1 rounded-xl border border-cr-blue/40 bg-cr-bg-deep px-4 py-3 font-mono text-lg uppercase"
            onKeyDown={(e) => e.key === "Enter" && lookup()}
          />
          <button type="button" onClick={lookup} disabled={loading} className="cr-btn-gold disabled:opacity-50">
            {loading ? "Scouting..." : "Scout Player"}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>

      {player && (
        <>
          <div className="cr-panel p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {player.name}
                </h3>
                <p className="font-mono text-cr-text-muted">{player.tag}</p>
                {player.clan && (
                  <p className="mt-1 text-sm text-cr-blue-bright">
                    Clan: {player.clan.name} ({player.clan.tag})
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
                  {player.trophies.toLocaleString()}
                </p>
                <p className="text-xs text-cr-text-muted">Trophies · Best {player.bestTrophies.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Wins", value: player.wins },
                { label: "Losses", value: player.losses },
                { label: "Win Rate", value: `${winRate}%` },
                { label: "3-Crown Wins", value: player.threeCrownWins },
                { label: "Battles", value: player.battleCount },
                { label: "Donations", value: player.donations },
                { label: "Challenge Max", value: player.challengeMaxWins },
                { label: "Arena", value: player.arena?.name ?? "—" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-cr-bg-deep/60 p-3 text-center">
                  <p className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </p>
                  <p className="text-xs text-cr-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {deckIds.length === 8 && (
            <div id="deck-sync" className="space-y-4">
              <h3 className="text-xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
                Current Battle Deck
              </h3>
              <DeckGrid cards={getCardsByIds(deckIds)} />
              <ShareCodeBar cardIds={deckIds} />
            </div>
          )}

          {battles.length > 0 && (
            <div id="battles" className="cr-panel p-6">
              <h3 className="mb-4 text-xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
                Recent Battles
              </h3>
              <div className="space-y-3">
                {battles.map((battle, i) => {
                  const team = battle.team?.[0];
                  const opp = battle.opponent?.[0];
                  const won = (team?.crowns ?? 0) > (opp?.crowns ?? 0);
                  return (
                    <div key={i} className="rounded-xl border border-cr-blue/20 bg-cr-bg-deep/40 p-4">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${won ? "text-cr-green" : "text-red-400"}`}>
                          {won ? "Victory" : "Defeat"} · {battle.type}
                        </span>
                        <span className="text-xs text-cr-text-muted">
                          {new Date(battle.battleTime).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm">
                        {team?.crowns ?? 0} - {opp?.crowns ?? 0} vs {opp?.name}
                      </p>
                      {team?.cards && (
                        <p className="mt-1 text-xs text-cr-text-muted">
                          Deck: {team.cards.map((c) => c.name).join(", ")}
                        </p>
                      )}
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
