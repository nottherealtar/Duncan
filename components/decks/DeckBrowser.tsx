"use client";

import { useCallback, useMemo, useState } from "react";
import type { Card, DeckEntry } from "@/lib/types";
import { CARDS, getCardsByIds, sortCards } from "@/lib/cards";
import { parseShareCode, validateDeck } from "@/lib/deck-utils";
import { DeckGrid } from "./DeckGrid";
import { ShareCodeBar } from "./ShareCodeBar";
import { CardSlot } from "./CardSlot";

type Mode = "browser" | "popular" | "builder" | "import";
type Screen = "decks" | "collection";

interface DeckBrowserProps {
  decks: DeckEntry[];
  initialTab?: Mode;
}

export function DeckBrowser({
  decks,
  initialTab = "browser",
}: DeckBrowserProps) {
  const [mode, setMode] = useState<Mode>(initialTab);
  const [screen, setScreen] = useState<Screen>("decks");
  const [selectedDeck, setSelectedDeck] = useState<DeckEntry | null>(decks[0] ?? null);
  const [builderIds, setBuilderIds] = useState<number[]>([]);
  const [importInput, setImportInput] = useState("");
  const [importError, setImportError] = useState("");
  const [sortBy, setSortBy] = useState<"elixir" | "name" | "rarity">("elixir");
  const [deckSlot, setDeckSlot] = useState(1);
  const [showDeckList, setShowDeckList] = useState(false);

  const builderCards = useMemo(() => getCardsByIds(builderIds), [builderIds]);
  const activeCards = useMemo(() => {
    if (mode === "builder") return builderCards;
    return selectedDeck ? getCardsByIds(selectedDeck.cardIds) : [];
  }, [mode, builderCards, selectedDeck]);

  const collectionCards = useMemo(() => sortCards(CARDS, sortBy), [sortBy]);

  const popularDecks = useMemo(
    () => [...decks].sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0)),
    [decks]
  );

  const deckList = mode === "popular" ? popularDecks : decks;

  const addCard = useCallback((card: Card) => {
    setBuilderIds((prev) => {
      if (prev.length >= 8 || prev.includes(card.id)) return prev;
      return [...prev, card.id];
    });
  }, []);

  const removeCard = useCallback((index: number) => {
    setBuilderIds((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleImport = () => {
    const ids = parseShareCode(importInput);
    if (!ids) {
      setImportError("Paste a link.clashroyale.com URL or 8 card IDs.");
      return;
    }
    const { valid, error } = validateDeck(ids);
    if (!valid) {
      setImportError(error ?? "Invalid deck");
      return;
    }
    setImportError("");
    setBuilderIds(ids);
    setMode("builder");
    setScreen("decks");
  };

  const isBuilder = mode === "builder";

  return (
    <div className="flex flex-col gap-3">
      {/* Main ingame tabs */}
      <div className="grid grid-cols-2 gap-1.5">
        {(["decks", "collection"] as Screen[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScreen(s)}
            className={`rounded-xl py-3 text-base font-bold capitalize ${
              screen === s ? "cr-tab-pill-active" : "cr-tab-pill-inactive"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {s}
          </button>
        ))}
      </div>

      {screen === "decks" ? (
        <>
          {/* Mode pills */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {(
              [
                { id: "browser" as Mode, label: "Browser" },
                { id: "popular" as Mode, label: "Popular" },
                { id: "builder" as Mode, label: "Builder" },
                { id: "import" as Mode, label: "Import" },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold ${
                  mode === m.id ? "bg-cr-gold text-[#3a2800]" : "bg-cr-panel text-cr-text-muted"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {m.label}
              </button>
            ))}
          </div>

          {mode === "import" ? (
            <div className="cr-deck-surface space-y-3 p-4">
              <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Import Share Code
              </p>
              <textarea
                value={importInput}
                onChange={(e) => setImportInput(e.target.value)}
                placeholder="Paste deck link..."
                className="h-24 w-full rounded-xl border border-cr-blue/30 bg-cr-bg-deep p-3 text-xs"
              />
              {importError && <p className="text-xs text-red-400">{importError}</p>}
              <button type="button" onClick={handleImport} className="cr-btn-gold w-full text-sm">
                Import Deck
              </button>
            </div>
          ) : (
            <>
              {/* Deck slots */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setDeckSlot(n)}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition ${
                        deckSlot === n
                          ? "border-2 border-cr-gold bg-white text-cr-bg-deep"
                          : "bg-cr-blue-tab text-cr-text-muted"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeckList(!showDeckList)}
                  className="cr-btn-blue text-xs"
                >
                  {showDeckList ? "Hide" : "Pick Deck"}
                </button>
              </div>

              {/* Deck list drawer */}
              {showDeckList && (
                <div className="max-h-40 space-y-1.5 overflow-y-auto rounded-xl border border-cr-blue/20 bg-cr-bg-deep/60 p-2 scrollbar-hide">
                  {deckList.map((deck) => (
                    <button
                      key={deck.id}
                      type="button"
                      onClick={() => {
                        setSelectedDeck(deck);
                        setShowDeckList(false);
                        if (isBuilder) setMode("browser");
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left ${
                        selectedDeck?.id === deck.id ? "bg-cr-panel-light" : "bg-cr-panel/50"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                          {deck.name}
                        </p>
                        <p className="text-[10px] text-cr-text-muted">{deck.archetype}</p>
                      </div>
                      <span className="ml-2 shrink-0 text-xs font-bold text-cr-elixir">{deck.avgElixir}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* THE DECK — full width cards */}
              <DeckGrid
                cards={activeCards}
                showStats
                onCardRemove={isBuilder ? removeCard : undefined}
                emptySlots={isBuilder ? 8 - builderCards.length : 0}
              />

              {!isBuilder && selectedDeck && (
                <>
                  <ShareCodeBar cardIds={selectedDeck.cardIds} />
                  <a href={selectedDeck.shareCode} className="cr-btn-gold block text-center text-sm">
                    Import to Clash Royale
                  </a>
                </>
              )}

              {isBuilder && builderIds.length === 8 && <ShareCodeBar cardIds={builderIds} />}

              {isBuilder && builderIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setBuilderIds([])}
                  className="w-full rounded-xl border border-red-500/30 py-2 text-xs font-bold text-red-400"
                >
                  Clear Deck
                </button>
              )}

            </>
          )}

          <button type="button" className="cr-btn-gold w-full py-4 text-lg">
            OK
          </button>
        </>
      ) : (
        /* Collection screen — ingame card scroll */
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Card Collection
              </p>
              <p className="text-[10px] font-bold text-cr-pink">Challenge Event</p>
            </div>
            <div className="flex gap-1">
              <button type="button" className="cr-btn-blue px-2 py-1 text-[10px]">⚙</button>
              <button
                type="button"
                onClick={() => setSortBy(sortBy === "elixir" ? "name" : "elixir")}
                className="cr-btn-blue px-2 py-1 text-[10px]"
              >
                {sortBy === "elixir" ? "Elixir ↑" : "Name"}
              </button>
            </div>
          </div>

          <p className="text-[10px] font-bold tracking-wider text-cr-text-muted uppercase">Found</p>

          <div className="grid grid-cols-4 gap-1.5">
            {collectionCards.map((card, i) => {
              const inDeck = builderIds.includes(card.id);
              return (
                <div key={card.id} className={inDeck ? "opacity-35" : ""}>
                  <CardSlot
                    card={card}
                    variant="collection"
                    index={i}
                    onClick={() => {
                      if (mode !== "builder") setMode("builder");
                      if (!inDeck) addCard(card);
                      setScreen("decks");
                    }}
                  />
                </div>
              );
            })}
          </div>

          <button type="button" onClick={() => setScreen("decks")} className="cr-btn-gold mt-2 w-full py-4 text-lg">
            OK
          </button>
        </div>
      )}
    </div>
  );
}
