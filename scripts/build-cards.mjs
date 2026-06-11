import { readFileSync, writeFileSync } from "fs";

const ROYALEAPI_META_URL = "https://royaleapi.github.io/cr-api-data/json/cards.json";
const ROYALEAPI_ASSETS = "https://royaleapi.github.io/cr-api-assets/cards";
const SUPERCELL_PROXY = process.env.CLASH_ROYALE_PROXY_URL ?? "https://proxy.royaleapi.dev/v1";
const SUPERCELL_DIRECT = process.env.CLASH_ROYALE_API_URL ?? "https://api.clashroyale.com/v1";

/** Cards newer than community datasets — merged when Supercell API lacks them yet */
const MANUAL_META = {
  "Little Prince": { id: 26000093, key: "little-prince", elixir: 3, rarity: "Champion", type: "troop", maxLevel: 4 },
  Goblinstein: { id: 26000098, key: "goblinstein", elixir: 5, rarity: "Champion", type: "troop", maxLevel: 4 },
  "Goblin Demolisher": { id: 26000095, key: "goblin-demolisher", elixir: 4, rarity: "Rare", type: "troop", maxLevel: 14 },
  "Goblin Machine": { id: 26000096, key: "goblin-machine", elixir: 5, rarity: "Legendary", type: "troop", maxLevel: 6 },
  "Suspicious Bush": { id: 26000097, key: "suspicious-bush", elixir: 2, rarity: "Rare", type: "troop", maxLevel: 14 },
  "Goblin Curse": { id: 28000019, key: "goblin-curse", elixir: 2, rarity: "Epic", type: "spell", maxLevel: 9 },
  "Rune Giant": { id: 26000099, key: "rune-giant", elixir: 4, rarity: "Epic", type: "troop", maxLevel: 9 },
  "Berserk Archer": { id: 26000100, key: "berserk-archer", elixir: 2, rarity: "Epic", type: "troop", maxLevel: 9 },
  "Boss Bandit": { id: 26000103, key: "boss-bandit", elixir: 6, rarity: "Champion", type: "troop", maxLevel: 4 },
  "Tower Princess": { id: 159000000, key: "tower-princess", elixir: 0, rarity: "Legendary", type: "tower", maxLevel: 14, deckEligible: false },
  "Dagger Duchess": { id: 159000001, key: "dagger-duchess", elixir: 0, rarity: "Legendary", type: "tower", maxLevel: 14, deckEligible: false },
  "Royal Chef": { id: 159000002, key: "royal-chef", elixir: 0, rarity: "Legendary", type: "tower", maxLevel: 14, deckEligible: false },
  Cannoneer: { id: 159000003, key: "cannoneer", elixir: 0, rarity: "Legendary", type: "tower", maxLevel: 14, deckEligible: false },
};

const EVENT_PREFIXES = ["Party ", "Super ", "Santa ", "Raging "];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function royaleAssetUrl(meta, manual, name) {
  const key = manual.key ?? meta.key ?? slugify(name);
  return `${ROYALEAPI_ASSETS}/${key}.png`;
}

function normalizeType(raw) {
  const t = String(raw ?? "Troop").toLowerCase();
  if (t === "spell") return "spell";
  if (t === "building") return "building";
  if (t === "tower") return "tower";
  return "troop";
}

function normalizeRarity(raw) {
  const r = String(raw ?? "Common");
  const map = { common: "Common", rare: "Rare", epic: "Epic", legendary: "Legendary", champion: "Champion" };
  return map[r.toLowerCase()] ?? r;
}

function inferTypeFromId(id) {
  if (id >= 28000000) return "spell";
  if (id >= 27000000) return "building";
  if (id >= 159000000) return "tower";
  return "troop";
}

function isDeckEligible(name, type, deckEligible) {
  if (deckEligible === false) return false;
  if (type === "tower") return false;
  if (EVENT_PREFIXES.some((p) => name.startsWith(p))) return false;
  return true;
}

function resolveIconUrl(supercellCard, meta, manual, name) {
  return (
    supercellCard.iconUrls?.medium ??
    supercellCard.iconUrl ??
    manual.iconUrl ??
    royaleAssetUrl(meta, manual, name)
  );
}

async function fetchRoyaleApiMeta() {
  const res = await fetch(ROYALEAPI_META_URL);
  if (!res.ok) throw new Error(`RoyaleAPI meta fetch failed: ${res.status}`);
  const data = await res.json();
  const byId = new Map();
  const byName = new Map();
  for (const card of data) {
    byId.set(card.id, card);
    byName.set(card.name, card);
  }
  return { list: data, byId, byName };
}

async function fetchSupercellCards() {
  const token = process.env.CLASH_ROYALE_API_TOKEN?.trim();
  if (!token) return null;

  const base = process.env.VERCEL === "1" || !process.env.CLASH_ROYALE_PROXY_URL ? SUPERCELL_PROXY : SUPERCELL_DIRECT;
  const res = await fetch(`${base}/cards`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    console.warn(`Supercell /cards failed (${res.status}), using cached raw data`);
    return null;
  }
  const data = await res.json();
  return data.items ?? data;
}

function loadCachedRaw() {
  try {
    const raw = JSON.parse(readFileSync("data/cards-raw.json", "utf8"));
    return raw.items ?? raw;
  } catch {
    return [];
  }
}

function buildCard(supercellCard, meta, manual) {
  const name = supercellCard.name;
  const merged = { ...manual, ...meta };
  const type = normalizeType(merged.type ?? inferTypeFromId(supercellCard.id));
  const rarity = normalizeRarity(merged.rarity ?? "Common");
  const elixir = merged.elixir ?? 4;
  const iconUrl = resolveIconUrl(supercellCard, meta, manual, name);

  return {
    id: supercellCard.id,
    name,
    maxLevel: supercellCard.maxLevel ?? merged.maxLevel ?? (rarity === "Champion" ? 4 : rarity === "Legendary" ? 6 : 14),
    elixir,
    rarity,
    iconUrl,
    type,
    description: merged.description ?? "",
    hasEvolution: Boolean(merged.evolved_spells_sc_key || supercellCard.iconUrls?.evolutionMedium),
    evolutionKey: merged.evolved_spells_sc_key || undefined,
    deckEligible: isDeckEligible(name, type, merged.deckEligible),
    arena: merged.arena,
  };
}

function makeSyntheticCard(name, manual, meta) {
  const merged = { ...meta, ...manual };
  return {
    id: manual.id ?? meta.id,
    name,
    maxLevel: manual.maxLevel ?? (merged.rarity === "Champion" ? 4 : merged.rarity === "Legendary" ? 6 : 14),
    iconUrls: { medium: royaleAssetUrl(meta, manual, name) },
  };
}

async function main() {
  const { list: royaleList, byId: metaById, byName: metaByName } = await fetchRoyaleApiMeta();
  const liveCards = await fetchSupercellCards();
  const sourceCards = liveCards ?? loadCachedRaw();

  if (!sourceCards.length) {
    throw new Error("No card source available");
  }

  writeFileSync(
    "data/cards-raw.json",
    JSON.stringify({ items: sourceCards, updatedAt: new Date().toISOString() }, null, 2)
  );

  const built = [];
  const seen = new Set();

  for (const sc of sourceCards) {
    const meta = metaById.get(sc.id) ?? metaByName.get(sc.name) ?? {};
    const manual = MANUAL_META[sc.name] ?? {};
    const card = buildCard(sc, meta, manual);
    if (!card.iconUrl) continue;
    built.push(card);
    seen.add(sc.name);
  }

  // RoyaleAPI lists cards before our cached Supercell dump is refreshed
  for (const meta of royaleList) {
    if (seen.has(meta.name)) continue;
    if (EVENT_PREFIXES.some((p) => meta.name.startsWith(p))) continue;
    if (meta.name === "Raging Prince") continue;

    const manual = MANUAL_META[meta.name] ?? {};
    const supplemental = makeSyntheticCard(meta.name, manual, meta);
    built.push(buildCard(supplemental, meta, manual));
    seen.add(meta.name);
  }

  // Purely manual cards (tower troops, unreleased in community datasets)
  for (const [name, manual] of Object.entries(MANUAL_META)) {
    if (seen.has(name)) continue;
    const meta = metaByName.get(name) ?? {};
    const supplemental = makeSyntheticCard(name, manual, meta);
    built.push(buildCard(supplemental, meta, manual));
    seen.add(name);
  }

  built.sort((a, b) => a.name.localeCompare(b.name));

  const payload = {
    items: built,
    updatedAt: new Date().toISOString(),
    sources: {
      supercell: Boolean(liveCards),
      royaleApiMeta: true,
      total: built.length,
      legendaries: built.filter((c) => c.rarity === "Legendary").length,
      champions: built.filter((c) => c.rarity === "Champion").length,
      evolutions: built.filter((c) => c.hasEvolution).length,
      towers: built.filter((c) => c.type === "tower").length,
      deckBuilder: built.filter((c) => c.deckEligible).length,
    },
  };

  writeFileSync("data/cards.json", JSON.stringify(payload, null, 2));
  console.log(
    `Built ${built.length} cards (${payload.sources.legendaries} legendary, ${payload.sources.champions} champion, ${payload.sources.evolutions} with evolution, ${payload.sources.towers} tower, ${payload.sources.deckBuilder} deck-eligible)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
