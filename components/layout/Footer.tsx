import Link from "next/link";
import { SITE_TREE } from "@/lib/site-tree";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-cr-blue/30 bg-cr-bg-deep safe-bottom">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
              Duncan
            </h3>
            <p className="text-sm leading-relaxed text-cr-text-muted">
              A fan-made Clash Royale companion. Not affiliated with Supercell.
              Card images and stats are sourced from the official Supercell API.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold tracking-wider text-cr-blue-bright uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/decks" className="text-cr-text-muted hover:text-cr-gold">Meta Decks & Builder</Link></li>
              <li><Link href="/cards" className="text-cr-text-muted hover:text-cr-gold">Card Encyclopedia</Link></li>
              <li><Link href="/scout" className="text-cr-text-muted hover:text-cr-gold">Player Scout</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold tracking-wider text-cr-blue-bright uppercase">
              Official Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://developer.clashroyale.com" target="_blank" rel="noopener noreferrer" className="text-cr-text-muted hover:text-cr-gold">
                  Supercell Developer API
                </a>
              </li>
              <li>
                <a href="https://supercell.com/en/games/clashroyale/" target="_blank" rel="noopener noreferrer" className="text-cr-text-muted hover:text-cr-gold">
                  Clash Royale
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-cr-blue/20 bg-cr-panel/30 p-4">
          <h4 className="mb-3 text-sm font-bold text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
            Site Map
          </h4>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SITE_TREE.map((node) => (
              <div key={node.href} className="text-sm">
                <Link href={node.href} className="font-bold text-cr-blue-bright hover:text-cr-gold">
                  {node.title}
                </Link>
                {node.children && (
                  <ul className="mt-2 space-y-1 border-l border-cr-blue/30 pl-3">
                    {node.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="text-cr-text-muted hover:text-white">
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-cr-text-muted">
          © {new Date().getFullYear()} Duncan · Fan project · Supercell, Clash Royale and related properties are trademarks of Supercell Oy
        </p>
      </div>
    </footer>
  );
}
