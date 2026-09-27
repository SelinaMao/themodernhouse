// Builds a single self-contained HTML preview of the site (for sharing without a server).
import { build } from "esbuild";
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

await build({
  entryPoints: ["preview/entry.tsx"],
  bundle: true, minify: true, format: "iife", jsx: "automatic",
  alias: { "@": "." }, define: { "process.env.NODE_ENV": '"production"', "process.env.NEXT_PUBLIC_IMG_BASE": '""' },
  outfile: "preview/out.js",
});
execSync("npx @tailwindcss/cli -i app/globals.css -o preview/out.css --minify", { stdio: "inherit" });
const css = readFileSync("preview/out.css", "utf8");
const js = readFileSync("preview/out.js", "utf8").replace(/<\/script/gi, "<\\/script");
const html = `<title>Modern House 01</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif&family=Kantumruy+Pro:wght@400;500;600&family=Moul&display=swap">
<style>${css}</style>
<div id="root"></div>
<script>${js}</script>
`;
writeFileSync("preview/sala-villas.html", html);
console.log("preview/sala-villas.html", (html.length / 1024).toFixed(0) + " KB");
