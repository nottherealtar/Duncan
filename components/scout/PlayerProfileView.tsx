"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { BattleLogEntry, PlayerProfile } from "@/lib/types";
import { DeckGrid } from "@/components/decks/DeckGrid";
import { ShareCodeBar } from "@/components/decks/ShareCodeBar";
import { getCardByName, getCardsByIds } from "@/lib/cards";
import { buildDeckShareLink } from "@/lib/deck-utils";
import { tagToPath } from "@/lib/validate-tag";

interface PlayerProfileViewProps {
  initialTag?: string;
  initialPlayer?: PlayerProfile | null;
  initialBattles?: BattleLogEntry[];
  initialError?: string;
}

export function PlayerProfileView({
  initialTag = "",
  initialPlayer = null,
  initialBattles = [],
  initialError = "",
}: PlayerProfileViewProps) {
  const [tag, setTag] = useState(initialTag);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [player, setPlayer] = useState<PlayerProfile | null>(initialPlayer);
  const [battles, setBattles] = useState<BattleLogEntry[]>(initialBattles);
  const [copied, setCopied] = useState(false);
  const [scoutStatus, setScoutStatus] = useState<string>("");

  useEffect(() => {
    fetch("/api/scout/status")
      .then((r) => r.json())
      .then((data: { ready?: boolean; hint?: string }) => {
        if (!data.ready && data.hint) setScoutStatus(data.hint);
      })
      .catch(() => {});
  }, []);

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
      if (!playerRes.ok) throw new Error(playerData.error ?? "Player not found");
      setPlayer(playerData);
      if (battleRes.ok) {
        const battleData = await battleRes.json();
        setBattles(battleData.battles?.slice(0, 10) ?? []);
      }
      const pathTag = tagToPath(tag.trim());
      if (pathTag) {
        window.history.replaceState(null, "", `/player/${pathTag}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Try again");
    } finally {
      setLoading(false);
    }
  };

  const winRate =
    player && player.battleCount > 0 ? Math.round((player.wins / player.battleCount) * 100) : 0;

  const deckIds =
    player?.currentDeck
      ?.map((c) => getCardByName(c.name)?.id)
      .filter((id): id is number => Boolean(id)) ?? [];

  const deckLevels = player?.currentDeck?.map((c) => c.level) ?? [];

  const shareProfile = async () => {
    if (!player) return;
    const path = tagToPath(player.tag);
    const url = `${window.location.origin}/player/${path}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="cr-panel p-4 sm:p-6">
        <h1 className="text-2xl text-cr-gold sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          Player Scout
        </h1>
        <p className="mt-1 text-sm text-cr-text-muted">
          Look up any player by tag. View trophies, stats, current deck, and recent battles.
        </p>
        <p className="mt-2 rounded-lg border border-cr-blue/30 bg-cr-bg-deep/60 px-3 py-2 text-xs text-cr-text-muted">
          Enter your <span className="font-bold text-white">player tag</span> from your profile (Settings →
          Player ID, with a <span className="font-mono">#</span> prefix). Do not paste the temporary API Token
          from in-game Settings.
        </p>
        {scoutStatus && (
          <p className="mt-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
            {scoutStatus}
          </p>
        )}

        <div className="mt-4 flex gap-2">
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="#YOURPLAYERTAG"
            className="flex-1 rounded-xl border border-cr-blue/40 bg-cr-bg-deep px-4 py-2.5 font-mono text-sm uppercase text-white placeholder:text-cr-text-muted"
            onKeyDown={(e) => e.key === "Enter" && lookup()}
            aria-label="Player tag"
          />
          <button
            type="button"
            onClick={lookup}
            disabled={loading}
            className="cr-btn-gold px-6 disabled:opacity-50"
          >
            {loading ? "..." : "Scout"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>

      {player && (
        <>
          <div className="cr-panel p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {player.name}
                </h2>
                <p className="font-mono text-sm text-cr-text-muted">{player.tag}</p>
                {player.clan && (
                  <p className="mt-1 text-sm text-cr-blue-bright">
                    Clan: {player.clan.name}{" "}
                    <span className="font-mono text-cr-text-muted">{player.clan.tag}</span>
                  </p>
                )}
                {player.arena && (
                  <p className="text-sm text-cr-text-muted">{player.arena.name}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
                  {player.trophies.toLocaleString()}
                </p>
                <p className="text-xs text-cr-text-muted">Trophies · Best {player.bestTrophies.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { label: "Wins", value: player.wins.toLocaleString() },
                { label: "Losses", value: player.losses.toLocaleString() },
                { label: "Win Rate", value: `${winRate}%` },
                { label: "3-Crown Wins", value: player.threeCrownWins.toLocaleString() },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-cr-bg-deep/60 p-3 text-center">
                  <p className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-cr-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            <button type="button" onClick={shareProfile} className="cr-btn-blue mt-4 text-sm">
              {copied ? "Profile link copied!" : "Copy Profile Link"}
            </button>
          </div>

          {deckIds.length === 8 && (
            <div className="space-y-4">
              <h3 className="text-lg text-white" style={{ fontFamily: "var(--font-display)" }}>
                Current Deck
              </h3>
              <DeckGrid
                cards={getCardsByIds(deckIds)}
                showLevels
                levels={deckLevels}
              />
              <ShareCodeBar
                shareCode={buildDeckShareLink(deckIds)}
                deckName={`${player.name}'s deck`}
              />
            </div>
          )}

          {battles.length > 0 && (
            <div className="cr-panel p-4">
              <h3 className="mb-3 text-lg text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
                Recent Battles
              </h3>
              <div className="space-y-2">
                {battles.map((battle, i) => {
                  const team = battle.team?.[0];
                  const opp = battle.opponent?.[0];
                  const won = (team?.crowns ?? 0) > (opp?.crowns ?? 0);
                  const oppTag = opp?.tag;
                  return (
                    <div
                      key={i}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-cr-bg-deep/60 px-3 py-2 text-sm"
                    >
                      <div>
                        <span className={won ? "font-bold text-cr-green" : "font-bold text-red-400"}>
                          {won ? "Victory" : "Defeat"}
                        </span>
                        <span className="ml-2 text-cr-text-muted">
                          {team?.crowns ?? 0}–{opp?.crowns ?? 0}
                        </span>
                      </div>
                      <div className="text-cr-text-muted">
                        vs{" "}
                        {oppTag ? (
                          <Link
                            href={`/player/${tagToPath(oppTag)}`}
                            className="text-cr-blue-bright hover:text-cr-gold"
                          >
                            {opp?.name}
                          </Link>
                        ) : (
                          opp?.name
                        )}
                      </div>
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
