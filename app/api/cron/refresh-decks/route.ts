import { NextResponse } from "next/server";
import { runDeckPipeline } from "@/lib/deck-pipeline";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction && !cronSecret) {
    return NextResponse.json({ error: "Cron not configured" }, { status: 503 });
  }

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runDeckPipeline();
  return NextResponse.json(result);
}
