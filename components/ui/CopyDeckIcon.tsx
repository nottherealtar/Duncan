export function CopyDeckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="12" height="14" rx="2" fill="#cce8ff" stroke="#fff" strokeWidth="1.5" />
      <rect x="9" y="4" width="12" height="14" rx="2" fill="#4db8ff" stroke="#fff" strokeWidth="1.5" />
      <path d="M15 8h4M15 11h4M15 14h3" stroke="#0a3058" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
