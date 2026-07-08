const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// ==============================
// Settings
// ==============================

const ROOT = __dirname;

const IGNORE_FILES = [
  "index.html",
  "btns.html",
  "search.html",
];

const OUTPUT_FILE = "search-data.json";

// ==============================
// Get HTML Files
// ==============================

const htmlFiles = fs
  .readdirSync(ROOT)
  .filter(file => {

    if (!file.endsWith(".html")) return false;

    if (IGNORE_FILES.includes(file.toLowerCase())) return false;

    return true;

  });

if (htmlFiles.length === 0) {

  console.log("No HTML files found.");

  process.exit();

}

let searchData = [];

console.log("-------------------------------------");
console.log("Scanning HTML Files...");
console.log("-------------------------------------");

// ==============================
// Read Every HTML File
// ==============================

htmlFiles.forEach(file => {

    console.log("Reading:", file);

    const filePath = path.join(ROOT, file);

    const html = fs.readFileSync(filePath, "utf8");

    const $ = cheerio.load(html);

    let currentVolume = "";

   $("table tr").each(function () {

    const row = $(this);
    const cells = row.find("td");

    if (cells.length < 2) return;

    // جلد والی Row
    if (row.hasClass("volumes")) {

        currentVolume = $(cells[1]).text().trim();

        return;

    }

    const title = $(cells[0]).text().replace(/\s+/g, " ").trim();

    const page = $(cells[1]).text().trim();

        if (!title || !page) return;
                searchData.push({

            title: title,

            page: page,

            volume: currentVolume,

            file: file

        });

    });

});


// ==============================
// Sort Data
// ==============================

searchData.sort((a, b) => {

    if (a.file === b.file) {

        return Number(a.page) - Number(b.page);

    }

    return a.file.localeCompare(b.file);

});

console.log("-------------------------------------");
console.log("Total Records :", searchData.length);
console.log("-------------------------------------");
// ==============================
// Save JSON File
// ==============================

const outputPath = path.join(ROOT, OUTPUT_FILE);

fs.writeFileSync(
    outputPath,
    JSON.stringify(searchData, null, 2),
    "utf8"
);

console.log("=====================================");
console.log("✅ search-data.json Created Successfully");
console.log("📁 File :", OUTPUT_FILE);
console.log("📚 Total Records :", searchData.length);
console.log("=====================================");