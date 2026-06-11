import { NextResponse } from "next/server";
import { fetchPlayer } from "@/lib/clash-api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tag: string }> }
) {
  try {
    const { tag } = await params;
    const decoded = decodeURIComponent(tag);
    const player = await fetchPlayer(decoded);
    return NextResponse.json(player);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch player";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
