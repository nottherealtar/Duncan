import { NextResponse } from "next/server";
import { getClashApiConfig } from "@/lib/clash-api";

export async function GET() {
  const { token, usingProxy, onVercel } = getClashApiConfig();

  return NextResponse.json({
    ready: token,
    tokenConfigured: token,
    usingProxy,
    onVercel,
    hint: !token
      ? "Add CLASH_ROYALE_API_TOKEN from developer.clashroyale.com (not the in-game Settings token)."
      : usingProxy
        ? "Using RoyaleAPI proxy — required for Vercel deployments."
        : "Direct Supercell API — ensure your server IP is whitelisted on developer.clashroyale.com.",
  });
}
