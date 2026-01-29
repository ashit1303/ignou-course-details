import fs from "fs";
import path from "path";
import axios from "axios";
import https from "https";

const INPUT = "./updated_course_details.json";
const OUTPUT_DIR = "./downloads";

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// TLS workaround for egyankosh
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const http = axios.create({
  responseType: "stream",
  timeout: 60000,
  httpsAgent,
  headers: {
    "User-Agent": "Mozilla/5.0 (EgyankoshDownloader)"
  }
});

function sanitize(name) {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function download(url, dest) {
  const res = await http.get(url);
  const writer = fs.createWriteStream(dest);

  return new Promise((resolve, reject) => {
    res.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function run() {
  const data = JSON.parse(fs.readFileSync(INPUT, "utf-8"));

  for (const item of data) {
    if (item.fileType !== "pdf") continue;
    if (!item.fileId) continue;

    const fileName =
      `${sanitize(item.fileName)}.pdf`;

    const filePath = path.join(OUTPUT_DIR, fileName);

    if (fs.existsSync(filePath)) {
      console.log("⏭️  Skipped:", fileName);
      continue;
    }

    console.log("⬇️  Downloading:", fileName);

    try {
      await download(item.fileLink, filePath);
      console.log("✅ Done");
    } catch (err) {
      console.error("❌ Failed:", fileName);
      console.error(err.message);
    }
  }

  console.log("🎉 All PDF downloads complete");
}

run();
