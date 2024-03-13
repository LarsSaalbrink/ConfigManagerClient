import fs from "fs";
import path from "path";
import { minify } from "html-minifier";
import zlib from "zlib";

// Define the directories
const buildDir = path.join(process.cwd(), "build");
const assetsDir = path.join(buildDir, "assets");

// Read the index.html file
const indexHtml = fs.readFileSync(path.join(buildDir, "index.html"), "utf-8");

// Inline the assets
let inlinedHtml = indexHtml;
fs.readdirSync(assetsDir).forEach((file) => {
    const assetPath = `/assets/${file}`;
    const assetData = fs.readFileSync(path.join(assetsDir, file), "utf-8");

    // Determine the MIME type based on the file extension
    let mimeType;
    if (file.endsWith(".js")) {
        mimeType = "text/javascript";
    } else if (file.endsWith(".css")) {
        mimeType = "text/css";
    } else {
        // Skip this file if it's not JavaScript or CSS
        return;
    }

    const assetDataUrl = `data:${mimeType};base64,${Buffer.from(
        assetData
    ).toString("base64")}`;
    inlinedHtml = inlinedHtml.replace(new RegExp(assetPath, "g"), assetDataUrl);
});

// Minify the HTML
const minifiedHtml = minify(inlinedHtml, {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    removeComments: true,
});

// Write the gzipped HTML back to index.html
fs.writeFileSync(path.join(buildDir, "singlepage.html"), minifiedHtml);

// Delete all other files & dirs in the build directory
fs.readdirSync(buildDir).forEach((file) => {
    if (file !== "singlepage.html") {
        if (file !== "singlepage.html") {
            const filePath = path.join(buildDir, file);
            fs.rmSync(filePath, { recursive: true, force: true });
        }
    }
});

// Save gzipped version also, more suitable for serving remote clients
const input = fs.createReadStream(path.join(buildDir, "singlepage.html"));
const output = fs.createWriteStream(path.join(buildDir, "singlepage.gz"));
input.pipe(zlib.createGzip()).pipe(output);
