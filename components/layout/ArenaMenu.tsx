"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/decks", label: "Decks" },
  { href: "/api-hub", label: "Scout" },
];

export function ArenaMenu() {
  const pathname = usePathname();
  if (pathname === "/decks") return null;

  return (
    <nav className="safe-bottom border-t border-[#1a4a7a]/50 px-3 py-2">
      <div className="flex gap-2">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`cr-display flex-1 rounded-xl py-3 text-center text-sm font-bold ${
              pathname === link.href ? "cr-mega-tab-on" : "cr-mega-tab-off"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
