"use client";

import Link from "next/link";

export function ResourceBar() {
  return (
    <header className="safe-top sticky top-0 z-40 px-2 pt-2">
      <div className="flex items-stretch gap-1.5">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2.5 py-2"
          style={{
            background: "linear-gradient(180deg, #2a6fc0 0%, #1a4f8f 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 3px 0 #0f3468",
          }}
        >
          <span className="text-lg">👑</span>
          <span className="truncate font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Duncan
          </span>
        </Link>

        <div
          className="flex flex-1 items-center justify-between rounded-xl px-2.5 py-2"
          style={{
            background: "linear-gradient(180deg, #e8b020 0%, #c9a020 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 3px 0 #8a6510",
          }}
        >
          <span className="text-sm">🪙</span>
          <span className="text-sm font-extrabold text-[#3a2800]" style={{ fontFamily: "var(--font-display)" }}>
            META
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#3a2800]/20 text-xs font-bold text-[#3a2800]">+</span>
        </div>

        <div
          className="flex flex-1 items-center justify-between rounded-xl px-2.5 py-2"
          style={{
            background: "linear-gradient(180deg, #3ddc6e 0%, #1faa55 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 3px 0 #0d6b35",
          }}
        >
          <span className="text-sm">💎</span>
          <span className="text-sm font-extrabold text-[#0a3d20]" style={{ fontFamily: "var(--font-display)" }}>
            LIVE
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0a3d20]/20 text-xs font-bold text-[#0a3d20]">+</span>
        </div>
      </div>
    </header>
  );
}
