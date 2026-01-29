import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false // 👈 allow bad cert chain
});

export const http = axios.create({
  timeout: 20000,
  httpsAgent,
  headers: {
    "User-Agent": "Mozilla/5.0 (EgyankoshCrawler)"
  },
  maxRedirects: 5
});
