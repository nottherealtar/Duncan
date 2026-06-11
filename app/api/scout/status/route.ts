import { NextResponse } from "next/server";
import { getClashApiBase, getClashApiConfig } from "@/lib/clash-api";

export async function GET() {
  const { token, usingProxy, onVercel } = getClashApiConfig();

  if (!token) {
    return NextResponse.json({
      ready: false,
      tokenConfigured: false,
      usingProxy,
      onVercel,
      hint: "Add CLASH_ROYALE_API_TOKEN from developer.clashroyale.com (not the in-game Settings → API Token).",
    });
  }

  const base = getClashApiBase();
  let apiOk = false;
  let apiError = "";

  try {
    const res = await fetch(`${base}/cards`, {
      headers: { Authorization: `Bearer ${process.env.CLASH_ROYALE_API_TOKEN?.trim()}` },
      cache: "no-store",
    });
    apiOk = res.ok;
    if (!res.ok) {
      if (res.status === 403) {
        apiError = usingProxy
          ? "API key rejected (403). On developer.clashroyale.com, edit your key and whitelist IP: 45.79.218.79 for the RoyaleAPI proxy."
          : "API key rejected (403). Whitelist your server IP on developer.clashroyale.com, or deploy on Vercel to use the RoyaleAPI proxy.";
      } else {
        apiError = `Clash Royale API returned ${res.status}. Check your developer key is valid and not expired.`;
      }
    }
  } catch {
    apiError = "Could not reach the Clash Royale API. Try again later.";
  }

  return NextResponse.json({
    ready: apiOk,
    tokenConfigured: true,
    usingProxy,
    onVercel,
    hint: apiOk
      ? "Scout is ready. Enter a player tag (e.g. #2L40G75306)."
      : apiError ||
        (usingProxy
          ? "Whitelist IP 45.79.218.79 on your developer API key for the RoyaleAPI proxy."
          : "Configure your developer API key on developer.clashroyale.com."),
  });
}
