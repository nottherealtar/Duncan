"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Card } from "@/lib/types";
import { CARDS, sortCards } from "@/lib/cards";
import { ElixirDrop } from "@/components/ui/ElixirDrop";
import { rarityColor } from "@/lib/deck-utils";
import Image from "next/image";

type SpecialFilter = "all" | "evolution" | "champion" | "tower";

export function CardBrowser() {
  const [sortBy, setSortBy] = useState<"elixir" | "name" | "rarity">("elixir");
  const [filterRarity, setFilterRarity] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [specialFilter, setSpecialFilter] = useState<SpecialFilter>("all");
  const [search, setSearch] = useState("");

  const cards = useMemo(() => {
    let list = sortCards(CARDS, sortBy);
    if (filterRarity !== "all") list = list.filter((c) => c.rarity === filterRarity);
    if (filterType !== "all") list = list.filter((c) => c.type === filterType);
    if (specialFilter === "evolution") list = list.filter((c) => c.hasEvolution);
    if (specialFilter === "champion") list = list.filter((c) => c.rarity === "Champion");
    if (specialFilter === "tower") list = list.filter((c) => c.type === "tower");
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    return list;
  }, [sortBy, filterRarity, filterType, specialFilter, search]);

  const counts = useMemo(
    () => ({
      total: CARDS.length,
      evolutions: CARDS.filter((c) => c.hasEvolution).length,
      champions: CARDS.filter((c) => c.rarity === "Champion").length,
      towers: CARDS.filter((c) => c.type === "tower").length,
    }),
    []
  );

  return (
    <div className="space-y-6">
      <div className="cr-panel p-4 sm:p-6">
        <h1 className="text-2xl text-cr-gold sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          Card Encyclopedia
        </h1>
        <p className="mt-1 text-sm text-cr-text-muted">
          Official card data merged from Supercell API and RoyaleAPI — including champions, evolutions, and tower troops.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cards..."
          className="min-w-[200px] flex-1 rounded-xl border border-cr-blue/40 bg-cr-bg-deep px-4 py-2.5 text-sm text-white placeholder:text-cr-text-muted"
        />
        <select
          value={filterRarity}
          onChange={(e) => setFilterRarity(e.target.value)}
          className="rounded-xl border border-cr-blue/40 bg-cr-bg-deep px-3 py-2.5 text-sm text-white"
        >
          <option value="all">All Rarities</option>
          <option value="Common">Common</option>
          <option value="Rare">Rare</option>
          <option value="Epic">Epic</option>
          <option value="Legendary">Legendary</option>
          <option value="Champion">Champion</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-xl border border-cr-blue/40 bg-cr-bg-deep px-3 py-2.5 text-sm text-white"
        >
          <option value="all">All Types</option>
          <option value="troop">Troops</option>
          <option value="spell">Spells</option>
          <option value="building">Buildings</option>
          <option value="tower">Tower Troops</option>
        </select>
        <button
          type="button"
          onClick={() => setSortBy(sortBy === "elixir" ? "name" : sortBy === "name" ? "rarity" : "elixir")}
          className="cr-btn-blue text-sm"
        >
          Sort: {sortBy === "elixir" ? "Elixir" : sortBy === "name" ? "Name" : "Rarity"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: "all" as const, label: `All (${counts.total})` },
            { id: "evolution" as const, label: `Evolutions (${counts.evolutions})` },
            { id: "champion" as const, label: `Champions (${counts.champions})` },
            { id: "tower" as const, label: `Tower Troops (${counts.towers})` },
          ] as const
        ).map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setSpecialFilter(f.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
              specialFilter === f.id
                ? "bg-cr-gold/20 text-cr-gold ring-1 ring-cr-gold/50"
                : "bg-cr-panel text-cr-text-muted hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-cr-text-muted">{cards.length} cards</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {cards.map((card) => (
          <CardTile key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

function CardTile({ card }: { card: Card }) {
  return (
    <Link
      href={`/cards/${card.id}`}
      className="group cr-panel overflow-hidden p-3 transition hover:scale-[1.02] hover:border-cr-gold/50"
    >
      <div
        className="relative mx-auto aspect-square w-full max-w-[100px] overflow-hidden rounded-xl"
        style={{ boxShadow: `inset 0 0 0 2px ${rarityColor(card.rarity)}60` }}
      >
        <div className="absolute top-1 left-1 z-10">
          <ElixirDrop cost={card.elixir} size="sm" />
        </div>
        {card.hasEvolution && (
          <span className="absolute top-1 right-1 z-10 rounded bg-purple-600/90 px-1 py-0.5 text-[8px] font-bold text-white">
            EVO
          </span>
        )}
        {card.type === "tower" && (
          <span className="absolute right-1 bottom-1 z-10 rounded bg-amber-600/90 px-1 py-0.5 text-[8px] font-bold text-white">
            TOWER
          </span>
        )}
        <Image
          src={card.iconUrl}
          alt={card.name}
          fill
          className="object-contain p-2 pt-5"
          sizes="100px"
          unoptimized
        />
      </div>
      <p
        className="mt-2 truncate text-center text-sm font-bold text-white group-hover:text-cr-gold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {card.name}
      </p>
      <p className="text-center text-[10px] text-cr-text-muted">
        {card.rarity} · {card.type === "tower" ? "Tower Troop" : card.type}
      </p>
    </Link>
  );
}
