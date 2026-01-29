import fs from "fs";
import { crawlPage } from "./crawler/crawlPage.js";

// UPDATE URL HERE KINDLY MAKE SURE TO PROVIDE ONLY  Semester-I | Semester-II | Semester-III | Semester-IV
const START_URL = "https://egyankosh.ac.in/handle/123456789/78830";

const output = [];

await crawlPage(START_URL, [], output);

fs.writeFileSync(
  "./downloadFiles/course_data.json",
  JSON.stringify(output, null, 2)
);

console.log("Done:", output.length);
