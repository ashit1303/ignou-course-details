import { absUrl } from "../utils/normalizeUrl.js";

export function extractCollection($) {
  return $("td[headers='t2'] a")
    .map((_, el) => ({
      title: $(el).text().trim(),
      link: absUrl($(el).attr("href"))
    }))
    .get();
}
