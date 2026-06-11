import { NextResponse } from "next/server";
import { fetchBattleLog } from "@/lib/clash-api";
import { userFacingApiError } from "@/lib/api-errors";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { normalizePlayerTag } from "@/lib/validate-tag";

const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tag: string }> }
) {
  const ip = getClientIp(request);
  const limited = rateLimit(`battles:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter ?? 60) } }
    );
  }

  try {
    const { tag: rawTag } = await params;
    const decoded = decodeURIComponent(rawTag);
    const tag = normalizePlayerTag(decoded);
    if (!tag) {
      return NextResponse.json({ error: "Invalid player tag." }, { status: 400 });
    }

    const battles = await fetchBattleLog(tag);
    return NextResponse.json({ battles });
  } catch (error) {
    return NextResponse.json({ error: userFacingApiError(error) }, { status: 400 });
  }
}
