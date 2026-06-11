import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCardById, CARDS } from "@/lib/cards";
import { rarityColor } from "@/lib/deck-utils";
import { ElixirDrop } from "@/components/ui/ElixirDrop";
import decksData from "@/data/decks.json";

interface CardPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return CARDS.map((card) => ({ id: String(card.id) }));
}

const TYPE_LABELS: Record<string, string> = {
  troop: "Troop",
  spell: "Spell",
  building: "Building",
  tower: "Tower Troop",
};

export default async function CardPage({ params }: CardPageProps) {
  const { id } = await params;
  const cardId = Number(id);
  if (Number.isNaN(cardId)) notFound();

  const card = getCardById(cardId);
  if (!card) notFound();

  const decksUsingCard = decksData.decks.filter((deck) => deck.cardIds.includes(cardId));

  return (
    <div className="space-y-6">
      <Link href="/cards" className="text-sm text-cr-blue-bright hover:text-cr-gold">
        ← Back to Cards
      </Link>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
        <div
          className="cr-panel relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden p-6"
          style={{ boxShadow: `inset 0 0 0 3px ${rarityColor(card.rarity)}80` }}
        >
          <div className="absolute top-4 left-4 z-10">
            <ElixirDrop cost={card.elixir} size="lg" />
          </div>
          <Image
            src={card.iconUrl}
            alt={card.name}
            fill
            className="object-contain p-8 pt-12"
            sizes="280px"
            unoptimized
            priority
          />
        </div>

        <div className="space-y-4">
          <div className="cr-panel p-6">
            <h1 className="text-3xl text-cr-gold sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              {card.name}
            </h1>
            <p className="mt-2 text-cr-text-muted">
              Official card data from the Supercell Clash Royale API.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {card.type !== "tower" && (
                <Stat label="Elixir" value={String(card.elixir)} accent="#ff44cc" />
              )}
              <Stat label="Rarity" value={card.rarity} accent={rarityColor(card.rarity)} />
              <Stat label="Type" value={TYPE_LABELS[card.type] ?? card.type} accent="#4a9eff" />
              <Stat label="Max Level" value={String(card.maxLevel)} accent="#f6c443" />
              {card.hasEvolution && <Stat label="Evolution" value="Available" accent="#c44dff" />}
            </dl>

            {card.description && (
              <p className="mt-4 text-sm leading-relaxed text-cr-text-muted">{card.description}</p>
            )}
          </div>

          <div className="cr-panel p-4 text-sm text-cr-text-muted">
            <p>
              Card images and stats are served from{" "}
              <a
                href="https://developer.clashroyale.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cr-blue-bright hover:text-cr-gold"
              >
                api-assets.clashroyale.com
              </a>
              , the official Supercell developer CDN. Duncan is a fan project and is not affiliated with Supercell.
            </p>
          </div>

          {decksUsingCard.length > 0 && (
            <div className="cr-panel p-4">
              <h2 className="mb-3 text-lg text-white" style={{ fontFamily: "var(--font-display)" }}>
                Used in Meta Decks
              </h2>
              <ul className="space-y-2">
                {decksUsingCard.map((deck) => (
                  <li key={deck.id}>
                    <Link
                      href="/decks?tab=browser"
                      className="text-sm text-cr-blue-bright hover:text-cr-gold"
                    >
                      {deck.name}
                    </Link>
                    <span className="ml-2 text-xs text-cr-text-muted">{deck.archetype}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl bg-cr-bg-deep/60 p-3 text-center">
      <dt className="text-xs text-cr-text-muted">{label}</dt>
      <dd className="mt-1 text-lg font-bold" style={{ color: accent, fontFamily: "var(--font-display)" }}>
        {value}
      </dd>
    </div>
  );
}
