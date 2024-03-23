const fs = require("fs");
const path = require("path");

const distPath = path.resolve(__dirname, "../dist");
const docsPath = path.resolve(__dirname, "../docs");

fs.rmSync(distPath, { recursive: true, force: true });
fs.rmSync(docsPath, { recursive: true, force: true });
