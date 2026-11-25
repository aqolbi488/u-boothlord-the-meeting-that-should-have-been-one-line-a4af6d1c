import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const line = "We spent an hour agreeing to keep doing exactly what we were already doing, then booked next week to confirm we're still doing it.";

const chars = [...line].length;
if (line.trim().length === 0) throw new Error("entry must not be whitespace-only");
if (chars < 1 || chars > 200) throw new Error("entry must be 1-200 characters");
if (line.includes("\n") || line.includes("\r")) throw new Error("entry must be a single line");
const sentences = line.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 1) throw new Error("entry must be exactly one sentence");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line + "\n", "utf8");

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== line + "\n") throw new Error("read-back mismatch");
const bytes = Buffer.byteLength(back, "utf8");
console.log(`wrote ${chars} chars, ${bytes} bytes`);
