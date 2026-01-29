import { absUrl } from "../utils/normalizeUrl.js";

export function extractCommunity($) {
  return $(".list-group-item-heading a")
    .map((_, el) => ({
      title: $(el).text().trim(),
      link: absUrl($(el).attr("href"))
    }))
    .get();
}
