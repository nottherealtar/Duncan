import { NextResponse } from "next/server";
import { fetchPlayer } from "@/lib/clash-api";
import { userFacingApiError } from "@/lib/api-errors";

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
    return NextResponse.json({ error: userFacingApiError(error) }, { status: 400 });
  }
}
