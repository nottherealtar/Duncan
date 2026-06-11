"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home", layer: 1 },
  { href: "/decks", label: "Decks", layer: 2 },
  { href: "/api-hub", label: "API Hub", layer: 3 },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-cr-blue/30 bg-cr-bg-deep/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cr-gold to-cr-gold-dark text-xl shadow-lg">
            👑
          </div>
          <div>
            <p className="text-xl leading-none text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
              Duncan
            </p>
            <p className="text-[10px] tracking-widest text-cr-text-muted uppercase">Clash Royale PWA</p>
          </div>
        </Link>

        <nav className="flex gap-1 sm:gap-2">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm font-bold transition sm:px-4 ${
                  active ? "cr-tab-active" : "cr-tab-inactive"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="hidden sm:inline">L{item.layer} </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center justify-center gap-6 border-t border-cr-blue/20 bg-cr-panel/40 px-4 py-1.5 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="text-cr-blue-bright">👑</span>
          <span className="font-bold text-white">Duncan</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-cr-gold">🪙</span>
          <span className="font-bold text-cr-gold">Meta</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-cr-gem">💎</span>
          <span className="font-bold text-cr-gem">Live</span>
        </span>
      </div>
    </header>
  );
}
