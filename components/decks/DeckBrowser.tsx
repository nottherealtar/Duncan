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
  initialTab?: Tab;
}

export function DeckBrowser({ decks, initialTab = "browser" }: DeckBrowserProps) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [selectedDeck, setSelectedDeck] = useState<DeckEntry | null>(decks[0] ?? null);
  const [builderIds, setBuilderIds] = useState<number[]>([]);
  const [importInput, setImportInput] = useState("");
  const [importError, setImportError] = useState("");
  const [sortBy, setSortBy] = useState<"elixir" | "name" | "rarity">("elixir");
  const [filterRarity, setFilterRarity] = useState<string>("all");
  const [search, setSearch] = useState("");

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
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      cards = cards.filter((c) => c.name.toLowerCase().includes(q));
    }
    return cards;
  }, [sortBy, filterRarity, search]);

  const popularDecks = useMemo(
    () => [...decks].sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0)),
    [decks]
  );

  const filteredDecks = useMemo(() => {
    const list = tab === "popular" ? popularDecks : decks;
    if (!search.trim() || tab === "builder" || tab === "import") return list;
    const q = search.trim().toLowerCase();
    return list.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.archetype.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [tab, popularDecks, decks, search]);

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
    { id: "browser", label: "Browse" },
    { id: "popular", label: "Popular" },
    { id: "builder", label: "Builder" },
    { id: "import", label: "Import" },
  ];

  return (
    <div className="space-y-6">
      <div className="cr-panel p-4 sm:p-6">
        <h1 className="text-2xl text-cr-gold sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          Deck Center
        </h1>
        <p className="mt-1 text-sm text-cr-text-muted">
          Browse meta decks, build your own, or import a deck shared from in-game.
        </p>
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
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="space-y-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search decks..."
              className="w-full rounded-xl border border-cr-blue/40 bg-cr-bg-deep px-4 py-2.5 text-sm text-white placeholder:text-cr-text-muted"
            />

            <div className="max-h-[65vh] space-y-2 overflow-y-auto pr-1 scrollbar-hide">
              {filteredDecks.map((deck) => (
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
                  {deck.winRate != null && (
                    <p className="mt-1 text-xs text-cr-green">Win rate: {deck.winRate}%</p>
                  )}
                </button>
              ))}
              {filteredDecks.length === 0 && (
                <p className="py-8 text-center text-sm text-cr-text-muted">No decks match your search.</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {selectedDeck ? (
              <>
                <div className="cr-panel p-4">
                  <h2 className="text-xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {selectedDeck.name}
                  </h2>
                  <p className="text-sm text-cr-text-muted">{selectedDeck.archetype}</p>
                </div>
                <DeckGrid cards={selectedCards} />
                {selectedDeck.shareCode && (
                  <ShareCodeBar shareCode={selectedDeck.shareCode} deckName={selectedDeck.name} />
                )}
              </>
            ) : (
              <div className="cr-panel p-8 text-center text-cr-text-muted">
                Select a deck from the list to view it.
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "builder" && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <DeckGrid
              cards={builderCards}
              emptySlots={8 - builderCards.length}
              onCardRemove={removeCard}
            />
            {builderIds.length === 8 ? (
              <div className="cr-panel p-4 text-sm text-cr-text-muted">
                <p className="font-bold text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
                  Deck complete
                </p>
                <p className="mt-1">
                  Custom decks don&apos;t have in-game share codes yet. Use Import to load a deck from
                  Clash Royale, or browse meta decks for verified import links.
                </p>
              </div>
            ) : (
              <p className="text-center text-sm text-cr-text-muted">
                Tap cards from the collection to add them. Click × on a card to remove it.
              </p>
            )}
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
            <p className="mb-3 text-xs text-cr-pink">{builderIds.length}/8 cards selected</p>

            <div className="mb-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSortBy(sortBy === "elixir" ? "name" : sortBy === "name" ? "rarity" : "elixir")}
                className="cr-btn-blue text-xs"
              >
                Sort: {sortBy === "elixir" ? "Elixir" : sortBy === "name" ? "Name" : "Rarity"}
              </button>
              <select
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value)}
                className="rounded-lg border border-cr-blue/40 bg-cr-bg-deep px-2 py-1 text-xs text-white"
              >
                <option value="all">All Rarities</option>
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
                <option value="Champion">Champion</option>
              </select>
            </div>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cards..."
              className="mb-3 w-full rounded-lg border border-cr-blue/40 bg-cr-bg-deep px-3 py-2 text-xs text-white placeholder:text-cr-text-muted"
            />

            <div className="grid max-h-[55vh] grid-cols-4 gap-2 overflow-y-auto pr-1 sm:grid-cols-5 scrollbar-hide">
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
            Import Deck
          </h3>
          <p className="text-sm text-cr-text-muted">
            Paste a deck link shared from Clash Royale or another site. This loads the deck into the
            builder so you can study or tweak it.
          </p>
          <textarea
            value={importInput}
            onChange={(e) => setImportInput(e.target.value)}
            placeholder="https://link.clashroyale.com/deck/en?deck=26000000;26000001;..."
            className="h-24 w-full rounded-xl border border-cr-blue/40 bg-cr-bg-deep p-3 text-sm text-white placeholder:text-cr-text-muted"
          />
          {importError && <p className="text-sm text-red-400">{importError}</p>}
          <button type="button" onClick={handleImport} className="cr-btn-gold w-full">
            Import to Builder
          </button>
        </div>
      )}
    </div>
  );
}
