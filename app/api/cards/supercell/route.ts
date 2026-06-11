import { NextResponse } from "next/server";
import { getClashApiBase } from "@/lib/clash-api";
import { userFacingApiError } from "@/lib/api-errors";

/** Proxies official Supercell /cards for build tooling and diagnostics */
export async function GET() {
  const token = process.env.CLASH_ROYALE_API_TOKEN?.trim();
  if (!token) {
    return NextResponse.json({ error: "API token not configured" }, { status: 503 });
  }

  try {
    const base = getClashApiBase();
    const res = await fetch(`${base}/cards`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Clash Royale API error (${res.status})`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: userFacingApiError(error) }, { status: 400 });
  }
}
