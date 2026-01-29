export const BASE = "https://egyankosh.ac.in";

export function absUrl(href) {
  if (!href) return null;
  return href.startsWith("http")
    ? href
    : `${BASE}${href}`;
}
