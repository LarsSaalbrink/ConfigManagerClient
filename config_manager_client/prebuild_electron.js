import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the absolute path to the project root
const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Read file 'electron.js'
const electronJs = fs.readFileSync(path.join(rootDir, "electron.js"), "utf-8");

// Read file 'build/singlepage.html'
const html = fs.readFileSync(
    path.join(rootDir, "build", "singlepage.html"),
    "utf-8"
);

// Prepend the html singlefile as variable 'html' to 'electron.js'
const electronJsWithHtml = `const html = \`${html}\`;\n${electronJs}`;

// Ensure the 'build/electron' directory exists
const dir = path.join(rootDir, "build", "electron");
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Write the new file 'build/electron/electron.js'
fs.writeFileSync(path.join(dir, "electron.js"), electronJsWithHtml);
