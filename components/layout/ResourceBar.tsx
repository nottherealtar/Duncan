"use client";

export function ResourceBar() {
  return (
    <header className="safe-top z-40 px-2 pt-1.5">
      <div className="flex items-stretch gap-1">
        <div className="cr-res-crown flex min-w-0 flex-[1.1] items-center gap-1.5 px-2 py-1.5">
          <span className="text-base leading-none">🃏</span>
          <span className="cr-display truncate text-sm font-bold text-white">1132</span>
        </div>
        <div className="cr-res-gold flex flex-1 items-center justify-between gap-1 px-2 py-1.5">
          <span className="text-sm">🪙</span>
          <span className="cr-display text-xs font-bold text-[#4a3200]">19 007</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#4a3200]/25 text-xs font-bold text-[#4a3200]">+</span>
        </div>
        <div className="cr-res-gem flex flex-1 items-center justify-between gap-1 px-2 py-1.5">
          <span className="text-sm">💎</span>
          <span className="cr-display text-xs font-bold text-[#0a4020]">529</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0a4020]/25 text-xs font-bold text-[#0a4020]">+</span>
        </div>
      </div>
    </header>
  );
}
