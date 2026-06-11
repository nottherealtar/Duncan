import { NextResponse } from "next/server";
import { CARDS } from "@/lib/cards";

export async function GET() {
  return NextResponse.json({ items: CARDS });
}
