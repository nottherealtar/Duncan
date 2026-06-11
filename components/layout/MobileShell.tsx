"use client";

import { ResourceBar } from "./ResourceBar";
import { BottomNav } from "./BottomNav";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="cr-arena-bg min-h-dvh">
      <div className="mobile-shell cr-arena-bg">
        <ResourceBar />
        <main className="flex-1 px-3 pb-24 pt-2 safe-top">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
