export function ElixirDrop({
  cost,
  size = "md",
}: {
  cost: number | string;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const sizes = {
    xs: "h-5 w-5 text-[10px] border",
    sm: "h-7 w-7 text-xs border-2",
    md: "h-9 w-9 text-sm border-2",
    lg: "h-11 w-11 text-base border-[3px]",
  };

  return (
    <div
      className={`relative flex items-center justify-center rounded-full border-white/90 font-extrabold text-white ${sizes[size]}`}
      style={{
        fontFamily: "var(--font-display)",
        background: "radial-gradient(circle at 35% 30%, #ff8ee0 0%, #ff3db8 45%, #c4007a 100%)",
        boxShadow: "0 0 10px rgba(255, 61, 184, 0.7), inset 0 -2px 4px rgba(0,0,0,0.25), inset 0 2px 3px rgba(255,255,255,0.35)",
        textShadow: "0 1px 2px rgba(0,0,0,0.5)",
      }}
    >
      {cost}
    </div>
  );
}
