"use client";

import { useCallback, useMemo, useState } from "react";
import type { Card, DeckEntry } from "@/lib/types";
import { CARDS, getCardsByIds, sortCards } from "@/lib/cards";
import { parseShareCode, validateDeck } from "@/lib/deck-utils";
import { DeckGrid } from "./DeckGrid";
import { CardSlot } from "./CardSlot";
import { buildDeckShareLink } from "@/lib/deck-utils";
import { CopyDeckIcon } from "@/components/ui/CopyDeckIcon";

type Tab = "decks" | "collection";

interface DeckBrowserProps {
  decks: DeckEntry[];
}

export function DeckBrowser({ decks }: DeckBrowserProps) {
  const [tab, setTab] = useState<Tab>("decks");
  const [deckSlot, setDeckSlot] = useState(1);
  const [selectedDeck, setSelectedDeck] = useState<DeckEntry | null>(decks[0] ?? null);
  const [builderIds, setBuilderIds] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importInput, setImportInput] = useState("");
  const [sortBy, setSortBy] = useState<"elixir" | "name">("elixir");
  const [isBuilding, setIsBuilding] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeIds = isBuilding ? builderIds : (selectedDeck?.cardIds ?? []);
  const activeCards = useMemo(() => getCardsByIds(activeIds), [activeIds]);
  const collectionCards = useMemo(() => sortCards(CARDS, sortBy), [sortBy]);

  const pickDeck = (deck: DeckEntry) => {
    setSelectedDeck(deck);
    setIsBuilding(false);
    setMenuOpen(false);
  };

  const addCard = useCallback((card: Card) => {
    setIsBuilding(true);
    setBuilderIds((prev) => {
      if (prev.length >= 8 || prev.includes(card.id)) return prev;
      return [...prev, card.id];
    });
    setTab("decks");
  }, []);

  const handleImport = () => {
    const ids = parseShareCode(importInput);
    if (!ids) return;
    const { valid } = validateDeck(ids);
    if (!valid) return;
    setBuilderIds(ids);
    setIsBuilding(true);
    setImportOpen(false);
    setTab("decks");
  };

  const shareLink = selectedDeck?.shareCode ?? (builderIds.length === 8 ? buildDeckShareLink(builderIds) : "");

  const copyDeck = async () => {
    if (!shareLink) return;
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-2 pb-2">
      <div className="grid grid-cols-2 gap-1">
        {(["Decks", "Collection"] as const).map((label, i) => {
          const t: Tab = i === 0 ? "decks" : "collection";
          return (
            <button
              key={label}
              type="button"
              onClick={() => setTab(t)}
              className={`cr-display py-3.5 text-base font-bold ${tab === t ? "cr-mega-tab-on" : "cr-mega-tab-off"}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {tab === "decks" && (
        <>
          <div className="cr-deck-toolbar flex items-center gap-2">
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="cr-filter-btn flex h-9 w-9 shrink-0 items-center justify-center text-lg">
              ☰
            </button>
            <div className="flex flex-1 justify-center gap-1.5">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setDeckSlot(n)}
                  className={`cr-display flex h-9 w-9 items-center justify-center text-sm font-bold ${deckSlot === n ? "cr-slot-on" : "cr-slot-off"}`}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={copyDeck}
              disabled={!shareLink}
              className={`cr-filter-btn flex h-9 w-9 shrink-0 items-center justify-center ${!shareLink ? "opacity-40" : ""}`}
              aria-label="Copy deck"
            >
              <CopyDeckIcon className="h-5 w-5" />
            </button>
          </div>

          {menuOpen && (
            <div className="max-h-36 overflow-y-auto rounded-lg border border-[#2878c0]/40 bg-[#0a1830]/95 p-1 scrollbar-hide">
              {decks.map((deck) => (
                <button
                  key={deck.id}
                  type="button"
                  onClick={() => pickDeck(deck)}
                  className={`cr-display mb-1 w-full rounded-lg px-3 py-2 text-left text-sm font-bold ${selectedDeck?.id === deck.id ? "bg-[#2878c0]" : "bg-[#1a3050]/80"}`}
                >
                  {deck.name}
                  <span className="float-right text-[#e532d2]">{deck.avgElixir}</span>
                </button>
              ))}
              <button type="button" onClick={() => { setImportOpen(true); setMenuOpen(false); }} className="cr-display w-full rounded-lg bg-[#1a3050]/80 px-3 py-2 text-left text-sm font-bold">
                Import Deck
              </button>
            </div>
          )}

          {importOpen && (
            <div className="cr-deck-panel space-y-2 p-3">
              <textarea
                value={importInput}
                onChange={(e) => setImportInput(e.target.value)}
                placeholder="Paste deck link..."
                className="h-16 w-full rounded-lg border border-[#2878c0]/40 bg-[#0a1830] p-2 text-xs text-white"
              />
              <div className="flex gap-2">
                <button type="button" onClick={handleImport} className="cr-filter-btn flex-1 py-2 text-sm">Import</button>
                <button type="button" onClick={() => setImportOpen(false)} className="cr-filter-btn flex-1 py-2 text-sm opacity-70">Cancel</button>
              </div>
            </div>
          )}

          <DeckGrid cards={activeCards} />

          <div className="mt-1">
            <div className="flex items-end justify-between px-0.5">
              <div>
                <p className="cr-display text-sm font-bold">Card Collection</p>
                <p className="cr-display text-[10px] font-bold text-[#ff66bb]">Challenge Event</p>
              </div>
              <div className="flex gap-1">
                <button type="button" className="cr-filter-btn h-7 w-7 text-xs">⚙</button>
                <button type="button" className="cr-filter-btn h-7 w-7 text-xs">↑</button>
                <button
                  type="button"
                  onClick={() => setSortBy(sortBy === "elixir" ? "name" : "elixir")}
                  className="cr-filter-btn px-2 py-1 text-[10px]"
                >
                  By Elixir
                </button>
              </div>
            </div>
            <p className="cr-display mt-1 px-0.5 text-[10px] font-bold text-[#8aaee0]">Found</p>
            <div className="mt-1 grid grid-cols-4 gap-[2px]">
              {collectionCards.slice(0, 20).map((card, i) => (
                <CardSlot key={card.id} card={card} variant="collection" index={i} onClick={() => addCard(card)} />
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "collection" && (
        <>
          <div className="flex items-end justify-between px-0.5">
            <div>
              <p className="cr-display text-sm font-bold">Card Collection</p>
              <p className="cr-display text-[10px] font-bold text-[#ff66bb]">Challenge Event</p>
            </div>
            <div className="flex gap-1">
              <button type="button" className="cr-filter-btn h-7 w-7 text-xs">⚙</button>
              <button type="button" className="cr-filter-btn h-7 w-7 text-xs">↑</button>
              <button type="button" onClick={() => setSortBy(sortBy === "elixir" ? "name" : "elixir")} className="cr-filter-btn px-2 py-1 text-[10px]">
                By Elixir
              </button>
            </div>
          </div>
          <p className="cr-display px-0.5 text-[10px] font-bold text-[#8aaee0]">Found</p>
          <div className="grid grid-cols-4 gap-[2px]">
            {collectionCards.map((card, i) => (
              <CardSlot key={card.id} card={card} variant="collection" index={i} onClick={() => addCard(card)} />
            ))}
          </div>
        </>
      )}

      {copied && (
        <p className="cr-display text-center text-xs font-bold text-[#33dd77]">Deck copied!</p>
      )}

      <div className="flex justify-center safe-bottom mt-2 px-6">
        <button type="button" className="cr-btn-ok">
          OK
        </button>
      </div>
    </div>
  );
}
