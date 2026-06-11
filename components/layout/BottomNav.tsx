"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home", icon: "🏰" },
  { href: "/decks", label: "Decks", icon: "🃏" },
  { href: "/api-hub", label: "Scout", icon: "📡" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="safe-bottom fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-3 pb-3"
      aria-label="Main navigation"
    >
      <div
        className="flex items-center justify-around rounded-2xl px-1 py-1.5"
        style={{
          background: "linear-gradient(180deg, rgba(20,50,94,0.98) 0%, rgba(10,28,56,0.99) 100%)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          border: "1px solid rgba(94, 179, 255, 0.15)",
        }}
      >
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 transition ${
                active ? "cr-tab-pill-active" : "opacity-70"
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span
                className="text-[11px] font-bold tracking-wide"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
