"use client";

import { usePathname } from "next/navigation";
import { ResourceBar } from "./ResourceBar";
import { ArenaMenu } from "./ArenaMenu";

export function MobileShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDeckScreen = pathname === "/decks";

  return (
    <div className="cr-tile-bg min-h-dvh">
      <div className="cr-app cr-tile-bg flex min-h-dvh flex-col">
        <ResourceBar />
        <main className={`flex-1 overflow-y-auto ${isDeckScreen ? "px-2 pb-2" : "px-3 pb-4"}`}>
          {children}
        </main>
        {!isDeckScreen && <ArenaMenu />}
      </div>
    </div>
  );
}
