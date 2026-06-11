import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Duncan — Clash Royale Companion",
    short_name: "Duncan",
    description: "Meta deck browser, deck builder, and player stats for Clash Royale",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a1628",
    theme_color: "#0a1628",
    categories: ["games", "entertainment"],
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icons/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
