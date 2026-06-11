import { NextResponse } from "next/server";
import { fetchBattleLog } from "@/lib/clash-api";
import { userFacingApiError } from "@/lib/api-errors";

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
    return NextResponse.json({ error: userFacingApiError(error) }, { status: 400 });
  }
}
