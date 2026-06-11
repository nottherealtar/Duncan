"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/decks", label: "Decks" },
  { href: "/cards", label: "Cards" },
  { href: "/scout", label: "Scout" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-cr-blue/30 bg-cr-bg-deep/95 backdrop-blur-md safe-top">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cr-gold to-cr-gold-dark text-xl shadow-lg">
            👑
          </div>
          <div>
            <p className="text-xl leading-none text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
              Duncan
            </p>
            <p className="text-[10px] tracking-widest text-cr-text-muted uppercase">Clash Royale</p>
          </div>
        </Link>

        <nav className="flex flex-wrap justify-end gap-1">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm font-bold transition sm:px-4 ${
                  active ? "cr-tab-active" : "cr-tab-inactive"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
