"use client";

import { useCallback, useMemo, useState } from "react";
import type { Card, DeckEntry } from "@/lib/types";
import { CARDS, getCardsByIds, sortCards } from "@/lib/cards";
import { parseShareCode, validateDeck } from "@/lib/deck-utils";
import { DeckGrid } from "./DeckGrid";
import { ShareCodeBar } from "./ShareCodeBar";
import { CardSlot } from "./CardSlot";

type Tab = "browser" | "popular" | "builder" | "import";

interface DeckBrowserProps {
  decks: DeckEntry[];
  pipelineStatus: string;
  pipelineMessage?: string;
  lastPipelineRun: string;
  initialTab?: Tab;
}

export function DeckBrowser({
  decks,
  pipelineStatus,
  pipelineMessage,
  lastPipelineRun,
  initialTab = "browser",
}: DeckBrowserProps) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [selectedDeck, setSelectedDeck] = useState<DeckEntry | null>(decks[0] ?? null);
  const [builderIds, setBuilderIds] = useState<number[]>([]);
  const [importInput, setImportInput] = useState("");
  const [importError, setImportError] = useState("");
  const [sortBy, setSortBy] = useState<"elixir" | "name" | "rarity">("elixir");
  const [filterRarity, setFilterRarity] = useState<string>("all");
  const [deckSlot, setDeckSlot] = useState(1);

  const builderCards = useMemo(() => getCardsByIds(builderIds), [builderIds]);
  const selectedCards = useMemo(
    () => (selectedDeck ? getCardsByIds(selectedDeck.cardIds) : []),
    [selectedDeck]
  );

  const collectionCards = useMemo(() => {
    let cards = sortCards(CARDS, sortBy);
    if (filterRarity !== "all") {
      cards = cards.filter((c) => c.rarity === filterRarity);
    }
    return cards;
  }, [sortBy, filterRarity]);

  const popularDecks = useMemo(
    () => [...decks].sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0)),
    [decks]
  );

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
      setImportError("Invalid share code. Paste a link.clashroyale.com URL or semicolon-separated card IDs.");
      return;
    }
    const { valid, error } = validateDeck(ids);
    if (!valid) {
      setImportError(error ?? "Invalid deck");
      return;
    }
    setImportError("");
    setBuilderIds(ids);
    setTab("builder");
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "browser", label: "Deck Browser" },
    { id: "popular", label: "Most Popular" },
    { id: "builder", label: "Deck Builder" },
    { id: "import", label: "Import Code" },
  ];

  return (
    <div className="space-y-6">
      <div className="cr-panel p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl text-cr-gold sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
              Deck Command Center
            </h1>
            <p className="mt-1 text-sm text-cr-text-muted">
              Daily pipeline · Last run: {new Date(lastPipelineRun).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-cr-bg-deep/60 px-3 py-2 text-sm">
            <span className={`h-2 w-2 rounded-full ${pipelineStatus === "success" ? "bg-cr-green" : pipelineStatus === "error" ? "bg-red-500" : "bg-cr-gold"}`} />
            <span className="text-cr-text-muted">{pipelineMessage ?? pipelineStatus}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${tab === t.id ? "cr-tab-active" : "cr-tab-inactive"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {(tab === "browser" || tab === "popular") && (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-3">
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setDeckSlot(n)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold transition ${
                    deckSlot === n
                      ? "border-2 border-cr-gold bg-white text-cr-bg-deep"
                      : "bg-cr-blue-tab text-cr-text-muted hover:bg-cr-panel-light"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {n}
                </button>
              ))}
            </div>

            <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
              {(tab === "popular" ? popularDecks : decks).map((deck) => (
                <button
                  key={deck.id}
                  type="button"
                  onClick={() => setSelectedDeck(deck)}
                  className={`w-full rounded-xl border p-3 text-left transition ${
                    selectedDeck?.id === deck.id
                      ? "border-cr-gold bg-cr-panel-light/60"
                      : "border-cr-blue/30 bg-cr-panel/40 hover:border-cr-blue-bright/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                        {deck.name}
                      </p>
                      <p className="text-xs text-cr-text-muted">{deck.archetype}</p>
                    </div>
                    <span className="rounded-full bg-cr-elixir/20 px-2 py-0.5 text-xs font-bold text-cr-elixir">
                      {deck.avgElixir}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {deck.tags.map((tag) => (
                      <span key={tag} className="rounded bg-cr-bg-deep/60 px-1.5 py-0.5 text-[10px] text-cr-blue-bright">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {deck.winRate && (
                    <p className="mt-1 text-xs text-cr-green">Win rate: {deck.winRate}%</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {selectedDeck && (
              <>
                <div className="flex flex-wrap gap-2">
                  <span className="cr-tab-active rounded-lg px-3 py-1 text-sm">Decks</span>
                  <span className="cr-tab-inactive rounded-lg px-3 py-1 text-sm">Collection</span>
                </div>
                <DeckGrid cards={selectedCards} />
                <ShareCodeBar cardIds={selectedDeck.cardIds} />
                <a href={selectedDeck.shareCode} className="cr-btn-gold block text-center">
                  Import to Clash Royale
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {tab === "builder" && (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="cr-tab-active rounded-lg px-3 py-1 text-sm">Decks</span>
              <span className="cr-tab-inactive rounded-lg px-3 py-1 text-sm">Collection</span>
            </div>
            <DeckGrid
              cards={builderCards}
              emptySlots={8 - builderCards.length}
              onCardRemove={removeCard}
            />
            <ShareCodeBar cardIds={builderIds} />
            {builderIds.length > 0 && (
              <button
                type="button"
                onClick={() => setBuilderIds([])}
                className="w-full rounded-xl border border-red-500/40 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                Clear Deck
              </button>
            )}
          </div>

          <div className="cr-panel p-4">
            <h3 className="mb-1 text-lg text-white" style={{ fontFamily: "var(--font-display)" }}>
              Card Collection
            </h3>
            <p className="mb-3 text-xs text-cr-pink">Challenge Event</p>

            <div className="mb-3 flex flex-wrap gap-2">
              <button type="button" className="cr-btn-blue text-xs">⚙ Filter</button>
              <button
                type="button"
                onClick={() => setSortBy(sortBy === "elixir" ? "name" : "elixir")}
                className="cr-btn-blue text-xs"
              >
                {sortBy === "elixir" ? "By Elixir ↑" : "By Name"}
              </button>
              <select
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value)}
                className="rounded-lg border border-cr-blue/40 bg-cr-bg-deep px-2 py-1 text-xs"
              >
                <option value="all">All Rarities</option>
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
              </select>
            </div>

            <p className="mb-2 text-xs font-bold text-cr-text-muted">Found</p>
            <div className="grid max-h-[55vh] grid-cols-4 gap-2 overflow-y-auto pr-1 sm:grid-cols-5">
              {collectionCards.map((card) => {
                const inDeck = builderIds.includes(card.id);
                return (
                  <div key={card.id} className={inDeck ? "opacity-40" : ""}>
                    <CardSlot
                      card={card}
                      size="collection"
                      onClick={() => !inDeck && addCard(card)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {tab === "import" && (
        <div className="cr-panel mx-auto max-w-xl space-y-4 p-6">
          <h3 className="text-xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
            Import Share Code
          </h3>
          <p className="text-sm text-cr-text-muted">
            Paste a deck link from Clash Royale or enter 8 card IDs separated by semicolons.
          </p>
          <textarea
            value={importInput}
            onChange={(e) => setImportInput(e.target.value)}
            placeholder="https://link.clashroyale.com/deck/en?deck=26000000;26000001;..."
            className="h-24 w-full rounded-xl border border-cr-blue/40 bg-cr-bg-deep p-3 text-sm"
          />
          {importError && <p className="text-sm text-red-400">{importError}</p>}
          <button type="button" onClick={handleImport} className="cr-btn-gold w-full">
            Import Deck
          </button>
        </div>
      )}

      <div className="flex justify-center">
        <button type="button" className="cr-btn-gold px-16 py-3 text-lg">
          OK
        </button>
      </div>
    </div>
  );
}
