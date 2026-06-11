export function ElixirDrop({ cost, size = "md" }: { cost: number | string; size?: "xs" | "sm" | "md" }) {
  const px = size === "xs" ? 18 : size === "sm" ? 22 : 28;
  const font = size === "xs" ? 9 : size === "sm" ? 11 : 13;

  return (
    <div
      className="cr-display flex items-center justify-center rounded-full font-bold text-white"
      style={{
        width: px,
        height: px,
        fontSize: font,
        background: "radial-gradient(circle at 35% 30%, #ff88dd 0%, #e532d2 50%, #a8008a 100%)",
        border: "2px solid rgba(255,255,255,0.85)",
        boxShadow: "0 0 8px rgba(229,50,210,0.7), inset 0 -2px 3px rgba(0,0,0,0.3)",
        textShadow: "0 1px 2px #000",
      }}
    >
      {cost}
    </div>
  );
}
