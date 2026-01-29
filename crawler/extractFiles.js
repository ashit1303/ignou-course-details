import * as cheerio from "cheerio";
import { absUrl } from "../utils/normalizeUrl.js";
import { http } from "../utils/http.js";
import { breadcrumbToChp } from "../utils/breadcrumb.js";

function extractYoutubeParamsFromHtml(html) {
  const $ = cheerio.load(html);

  // 1️⃣ iframe
  let ytHref =
    $("iframe[src*='youtubevideo.jsp']").attr("src") ||
    $("a[href*='youtubevideo.jsp']").attr("href");

  // 2️⃣ meta refresh
  if (!ytHref) {
    const meta = $("meta[http-equiv='REFRESH'], meta[http-equiv='refresh']").attr("content");
    if (meta) {
      const match = meta.match(/url\s*=\s*(.*)$/i);
      if (match) ytHref = match[1].trim();
    }
  }

  // 3️⃣ JS redirect fallback
  if (!ytHref) {
    const jsMatch = html.match(/youtubevideo\.jsp\?[^'"]+/);
    if (jsMatch) ytHref = jsMatch[0];
  }

  if (!ytHref) return null;

  const url = new URL(absUrl(ytHref));
  return {
    videoId: url.searchParams.get("src"),
    videoTitle: decodeURIComponent(url.searchParams.get("title") || "")
  };
}

export async function extractFiles($, breadcrumb) {
  const rows = $("table tbody tr").slice(1);
  const results = [];

  for (const row of rows) {
    const fileHref = $(row).find("td[headers='t1'] a").attr("href");
    const description = $(row).find("td[headers='t2']").text().trim();
    const format = $(row).find("td[headers='t4']").text().toLowerCase();

    if (!fileHref) continue;

    const chp = breadcrumbToChp(breadcrumb);

    // ---------- PDF ----------
    if (format.includes("pdf")) {
      results.push({
        ...chp,
        fileType: "pdf",
        fileName: description,
        fileLink: absUrl(fileHref),
        videoTitle: ""
      });
      continue;
    }

    // ---------- HTML → YouTube ----------
    if (format.includes("html")) {
      const htmlRes = await http.get(absUrl(fileHref));
      const yt = extractYoutubeParamsFromHtml(htmlRes.data);

      if (!yt || !yt.videoId) continue;

      results.push({
        ...chp,
        fileType: "video",
        fileName: description,
        fileLink: `https://www.youtube.com/watch?v=${yt.videoId}`,
        videoTitle: yt.videoTitle
      });
    }
  }

  return results;
}
