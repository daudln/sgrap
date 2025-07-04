import { db } from "@/db";
import { school } from "@/db/schema";
import fs from "fs/promises";
import path from "path";

async function loadJSON<T>(fileName: string): Promise<T> {
  const filePath = path.join(__dirname, "data", fileName);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function seed() {
  const schools = await loadJSON<(typeof school.$inferInsert)[]>(
    "schools.json"
  );

  await db.insert(school).values(schools).onConflictDoNothing();

  console.log("✅ Seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
