import Link from "next/link";
import { SITE_TREE } from "@/lib/site-tree";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-cr-blue/30 bg-cr-bg-deep">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-xl text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
              Duncan
            </h3>
            <p className="text-sm leading-relaxed text-cr-text-muted">
              A fan-made Clash Royale companion PWA. Not affiliated with Supercell.
              Card images served from official Supercell API asset CDN.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold tracking-wider text-cr-blue-bright uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-cr-text-muted hover:text-cr-gold">Home</Link></li>
              <li><Link href="/decks" className="text-cr-text-muted hover:text-cr-gold">Deck Browser</Link></li>
              <li><Link href="/api-hub" className="text-cr-text-muted hover:text-cr-gold">API Command Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold tracking-wider text-cr-blue-bright uppercase">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://developer.clashroyale.com" target="_blank" rel="noopener noreferrer" className="text-cr-text-muted hover:text-cr-gold">
                  Supercell API
                </a>
              </li>
              <li>
                <a href="https://supercell.com/en/terms-of-service/" target="_blank" rel="noopener noreferrer" className="text-cr-text-muted hover:text-cr-gold">
                  Supercell ToS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-cr-blue/20 bg-cr-panel/30 p-4">
          <h4 className="mb-3 text-sm font-bold text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
            Site Tree
          </h4>
          <div className="grid gap-4 sm:grid-cols-3">
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
                          └ {child.title}
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
