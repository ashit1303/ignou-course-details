import * as cheerio from "cheerio";
import pLimit from "p-limit";
import { http } from "../utils/http.js";
import { detectPageType } from "./detectPageType.js";
import { extractCommunity } from "./extractCommunity.js";
import { extractCollection } from "./extractCollection.js";
import { extractFiles } from "./extractFiles.js";

const limit = pLimit(5);
const visited = new Set();

export async function crawlPage(url, breadcrumb, output) {
  if (visited.has(url)) return;
  visited.add(url);

  const { data } = await http.get(url);
  const $ = cheerio.load(data);

  const type = detectPageType($);

  // -------- COMMUNITY --------
  if (type === "COMMUNITY") {
    const children = extractCommunity($);

    for (const c of children) {
      await limit(() =>
        crawlPage(
          c.link,
          [...breadcrumb, c.title], // 👈 dynamic push
          output
        )
      );
    }
  }

  // -------- COLLECTION --------
  if (type === "COLLECTION") {
    const items = extractCollection($);

    for (const i of items) {
      await limit(() =>
        crawlPage(
          i.link,
          [...breadcrumb, i.title],
          output
        )
      );
    }
  }

  // -------- ITEM --------
  if (type === "ITEM") {
    const files = await extractFiles($, breadcrumb);
    output.push(...files);
  }
}
