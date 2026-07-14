import { cp, mkdir } from "node:fs/promises";
import path from "node:path";

const source = path.resolve("assets");
const target = path.resolve("dist/assets");

await mkdir(path.dirname(target), { recursive: true });
await cp(source, target, { recursive: true });
console.log("Copied static assets to dist/assets");
