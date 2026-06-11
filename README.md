# Duncan — Clash Royale Companion PWA

A fan-made Progressive Web App for Clash Royale. Browse meta decks, build battle-ready compositions with an ingame-style deck viewer, and scout player stats via the official Supercell API.

**Not affiliated with Supercell.** Card images are served from the official Supercell API asset CDN (`api-assets.clashroyale.com`).

## Three Layers

| Layer | Route | Purpose |
|-------|-------|---------|
| **1 — Home** | `/` | Welcome, navigation cards, feature breakdown, site tree |
| **2 — Deck Browser** | `/decks` | Meta deck pipeline, popular decks, deck builder, share codes |
| **3 — API Hub** | `/api-hub` | Player lookup, battle log, deck sync via Supercell API |

## Features

- **Ingame-style deck viewer** — 2×4 card grid with elixir badges, level bars, and evolution borders
- **Share codes** — One-tap links that open Clash Royale (`link.clashroyale.com`)
- **Daily deck pipeline** — Cron job scans top player battle logs for new meta decks
- **PWA** — Installable on mobile with offline shell caching
- **Supercell API** — Player profiles, trophies, clan info, battle logs

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CLASH_ROYALE_API_TOKEN` | For live API | Token from [developer.clashroyale.com](https://developer.clashroyale.com) |
| `CLASH_ROYALE_PROXY_URL` | Optional | e.g. `https://proxy.royaleapi.dev/v1` |
| `CRON_SECRET` | Optional | Bearer token for cron endpoint security |

## Deployment (Vercel)

Vercel is recommended for Next.js, PWA support, and daily cron jobs.

1. Push to GitHub and import in Vercel
2. Add environment variables
3. Deploy — cron runs daily at 06:00 UTC

```bash
npm run build
```

## Card Data

Card images and IDs come from the official Supercell API. Run `node scripts/build-cards.mjs` to rebuild `data/cards.json` from the raw API response.

## License

Apache License 2.0 — see [LICENSE.md](LICENSE.md).
