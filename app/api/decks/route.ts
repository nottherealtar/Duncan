import { NextResponse } from "next/server";
import { loadDecksData } from "@/lib/deck-pipeline";

export async function GET() {
  const data = loadDecksData();
  return NextResponse.json(data);
}
