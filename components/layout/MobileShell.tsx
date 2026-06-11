"use client";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="cr-tile-bg min-h-dvh">
      <div className="cr-app cr-tile-bg flex min-h-dvh flex-col">
        <main className="flex-1 overflow-y-auto px-2 pb-2 safe-top pt-2">{children}</main>
      </div>
    </div>
  );
}
