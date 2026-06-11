export function userFacingApiError(error: unknown): string {
  const message = error instanceof Error ? error.message : "";

  if (!message) return "Something went wrong. Try again.";

  if (message.includes("CLASH_ROYALE_API_TOKEN") || message.includes("not configured")) {
    return "Scout is not configured yet. The site owner needs to add a developer API key from developer.clashroyale.com to Vercel.";
  }

  if (message.includes("access denied") || message.includes("403")) {
    return "Scout could not reach the Clash Royale API. The developer key may be invalid, or the RoyaleAPI proxy may be required on Vercel.";
  }

  if (message.includes("not found") || message.includes("404")) {
    return "Player not found. Check the tag and try again.";
  }

  if (message.includes("Clash Royale API error")) {
    return "Could not load player data. Try again later.";
  }

  return message;
}
