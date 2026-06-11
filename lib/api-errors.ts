export function userFacingApiError(error: unknown): string {
  const message = error instanceof Error ? error.message : "";

  if (!message) return "Something went wrong. Try again.";

  if (
    message.includes("CLASH_ROYALE_API_TOKEN") ||
    message.includes("not configured") ||
    message.includes("access denied") ||
    message.includes("403")
  ) {
    return "Scout is unavailable right now. Try again later.";
  }

  if (message.includes("not found") || message.includes("404")) {
    return "Player not found. Check the tag and try again.";
  }

  if (message.includes("Clash Royale API error")) {
    return "Could not load player data. Try again later.";
  }

  return message;
}
