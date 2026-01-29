import fs from "fs";

const INPUT = "./course_data.json";
const OUTPUT = "./updated_course_details.json";

function generateId() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

const data = JSON.parse(fs.readFileSync(INPUT, "utf-8"));
const usedIds = new Set();

for (const item of data) {
  if (item.fileType === "pdf") {
    let id;
    do {
      id = generateId();
    } while (usedIds.has(id));

    usedIds.add(id);
    item.fileId = id;
    item.fileName = `${item.chp4}-${id}`;
  }
}

fs.writeFileSync(OUTPUT, JSON.stringify(data, null, 2));
console.log("✅ fileId added to PDFs only");
