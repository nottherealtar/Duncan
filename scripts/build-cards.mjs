import { readFileSync, writeFileSync } from "fs";

const ELIXIR = {
  Knight: 3, Archers: 3, Goblins: 2, Giant: 5, "P.E.K.K.A": 7, Minions: 3,
  Balloon: 5, Witch: 5, Barbarians: 5, Golem: 8, Skeletons: 1, Valkyrie: 4,
  "Skeleton Army": 3, Bomber: 2, Musketeer: 4, "Baby Dragon": 4, Prince: 5,
  Wizard: 5, "Mini P.E.K.K.A": 4, "Spear Goblins": 2, "Giant Skeleton": 6,
  "Hog Rider": 4, "Minion Horde": 5, "Ice Wizard": 3, "Royal Giant": 6,
  Guards: 3, Princess: 3, "Dark Prince": 4, "Three Musketeers": 9,
  "Lava Hound": 7, "Ice Spirit": 1, "Fire Spirit": 1, Miner: 3, Sparky: 6,
  Bowler: 5, Lumberjack: 4, "Battle Ram": 4, "Goblin Barrel": 3,
  "Inferno Tower": 5, Tombstone: 3, "Mega Minion": 3, "Dart Goblin": 3,
  "Goblin Gang": 3, "Electro Wizard": 4, "Elite Barbarians": 6, Hunter: 4,
  "Executioner": 5, "Bandit": 3, "Royal Recruits": 7, "Night Witch": 4,
  Bats: 2, "Royal Ghost": 3, "Ram Rider": 5, Zappies: 4, Rascals: 5,
  Cannon: 3, "Goblin Hut": 5, "Inferno Dragon": 4, "Ice Golem": 2,
  "Mega Knight": 7, "Skeleton Barrel": 3, "Flying Machine": 4, "Wall Breakers": 2,
  "Royal Hogs": 5, "Goblin Giant": 6, Fisherman: 3, "Magic Archer": 4,
  "Electro Dragon": 5, Firecracker: 3, "Mighty Miner": 4, "Elixir Golem": 3,
  "Battle Healer": 4, "Skeleton King": 4, "Archer Queen": 5, "Golden Knight": 4,
  Monk: 5, "Skeleton Dragons": 4, "Mother Witch": 4, "Electro Spirit": 1,
  "Electro Giant": 7, Phoenix: 4, "Little Prince": 3, Goblinstein: 5,
  "Goblin Demolisher": 4, "Goblin Machine": 5, "Suspicious Bush": 2,
  "Goblin Curse": 2, "Rune Giant": 4, "Berserk Archer": 2, "Boss Bandit": 6,
  Tesla: 4, Arrows: 3, Zap: 2, "Giant Snowball": 2,
  "The Log": 2, Poison: 4, Graveyard: 5, Lightning: 6, Rocket: 6,
  "Goblin Drill": 4, Earthquake: 3, "Barbarian Barrel": 2, "Royal Delivery": 3,
  "Heal Spirit": 1, Tornado: 3, "Cannon Cart": 5,
  Mirror: 0, Clone: 3, Rage: 2, Freeze: 4, "X-Bow": 6, Mortar: 4,
  "Bomb Tower": 4, "Barbarian Hut": 7, Furnace: 4, "Elixir Collector": 6,
  "Goblin Cage": 4,
};

const RARITY = {
  Knight: "Common", Archers: "Common", Goblins: "Common", Giant: "Rare",
  "P.E.K.K.A": "Epic", Minions: "Common", Balloon: "Epic", Witch: "Epic",
  Barbarians: "Common", Golem: "Epic", Skeletons: "Common", Valkyrie: "Rare",
  "Skeleton Army": "Epic", Bomber: "Common", Musketeer: "Rare",
  "Baby Dragon": "Epic", Prince: "Epic", Wizard: "Rare", "Mini P.E.K.K.A": "Rare",
  "Spear Goblins": "Common", "Giant Skeleton": "Epic", "Hog Rider": "Rare",
  "Minion Horde": "Common", "Ice Wizard": "Legendary", "Royal Giant": "Common",
  Guards: "Epic", Princess: "Legendary", "Dark Prince": "Epic",
  "Three Musketeers": "Rare", "Lava Hound": "Legendary", "Ice Spirit": "Common",
  "Fire Spirit": "Common", Miner: "Legendary", Sparky: "Legendary", Bowler: "Epic",
  Lumberjack: "Legendary", "Battle Ram": "Rare", "Goblin Barrel": "Epic",
  "Inferno Tower": "Rare", Tesla: "Common", Arrows: "Common", Zap: "Common",
  "The Log": "Legendary", Rocket: "Rare",
};

const raw = JSON.parse(readFileSync("data/cards-raw.json", "utf8"));
const cards = raw.items.map((card) => ({
  id: card.id,
  name: card.name,
  maxLevel: card.maxLevel,
  elixir: ELIXIR[card.name] ?? 4,
  rarity: RARITY[card.name] ?? "Common",
  iconUrl: card.iconUrls.medium,
  type: card.id >= 28000000 ? "spell" : card.id >= 27000000 ? "building" : "troop",
}));

writeFileSync("data/cards.json", JSON.stringify({ items: cards, updatedAt: new Date().toISOString() }, null, 2));
console.log(`Built ${cards.length} cards`);
