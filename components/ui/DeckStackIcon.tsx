export function DeckStackIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="8" width="10" height="13" rx="1.5" fill="#2878c0" stroke="#8fd4ff" strokeWidth="1" />
      <rect x="7" y="5" width="10" height="13" rx="1.5" fill="#4db8ff" stroke="#fff" strokeWidth="1.2" />
      <rect x="10" y="2" width="10" height="13" rx="1.5" fill="#8fd4ff" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}
