const TAG_CHARS = /^[0289PYLQGRJCUV]+$/;

export function normalizePlayerTag(tag: string): string | null {
  const cleaned = tag.replace(/^#/, "").toUpperCase().replace(/[^0289PYLQGRJCUV]/g, "");
  if (cleaned.length < 3 || cleaned.length > 15 || !TAG_CHARS.test(cleaned)) {
    return null;
  }
  return `#${cleaned}`;
}

export function tagToPath(tag: string): string {
  const normalized = normalizePlayerTag(tag);
  if (!normalized) return "";
  return normalized.replace("#", "");
}
