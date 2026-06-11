export function ElixirDrop({ cost, size = "md" }: { cost: number | string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
  };

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-cr-elixir to-cr-elixir-glow font-bold text-white shadow-[0_0_12px_rgba(255,68,204,0.6)] ${sizes[size]}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      <span className="drop-shadow-md">{cost}</span>
    </div>
  );
}
