import Link from "next/link";

interface LayerCardProps {
  layer: number;
  title: string;
  subtitle: string;
  href: string;
  icon: string;
  accent: string;
}

export function LayerCard({ layer, title, subtitle, href, icon, accent }: LayerCardProps) {
  return (
    <Link
      href={href}
      className="group cr-panel relative overflow-hidden p-6 transition hover:scale-[1.02] hover:border-cr-gold/50"
    >
      <div
        className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
        style={{ background: accent }}
      />
      <div className="relative">
        <span
          className="inline-block rounded-lg px-2 py-0.5 text-xs font-bold text-cr-bg-deep"
          style={{ background: accent, fontFamily: "var(--font-display)" }}
        >
          Layer {layer}
        </span>
        <div className="mt-4 text-5xl">{icon}</div>
        <h3 className="mt-3 text-2xl text-white group-hover:text-cr-gold" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-cr-text-muted">{subtitle}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cr-blue-bright group-hover:text-cr-gold">
          Enter →
        </span>
      </div>
    </Link>
  );
}
