import { NextResponse } from "next/server";
import { fetchBattleLog } from "@/lib/clash-api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tag: string }> }
) {
  try {
    const { tag } = await params;
    const decoded = decodeURIComponent(tag);
    const battles = await fetchBattleLog(decoded);
    return NextResponse.json({ battles });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch battles";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
