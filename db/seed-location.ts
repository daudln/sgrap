import { promises as fs } from "fs";
import path from "path";
import { db } from "@/db";
import { region, district, ward, street } from "@/db/schema/setting";
import { createId } from "@paralleldrive/cuid2";
import { parse } from "csv-parse/sync";

const LOCATIONS_DIR = path.join(__dirname, "data", "locations");

type Row = {
  REGION: string;
  REGIONCODE: string;
  DISTRICT: string;
  DISTRICTCODE: string;
  WARD: string;
  WARDCODE: string;
  STREET: string;
};

async function seedAllLocations() {
  console.log("Seeding locations");
  // 1. Read all CSV files in the locations directory
  const files = (await fs.readdir(LOCATIONS_DIR)).filter((f) =>
    f.endsWith(".csv")
  );
  const regionMap = new Map<string, string>(); // code -> id
  const districtMap = new Map<string, string>(); // code -> id
  const wardMap = new Map<string, string>(); // code -> id

  // To avoid duplicate inserts
  const regions: Record<string, { id: string; name: string; code: string }> =
    {};
  const districts: Record<
    string,
    { id: string; name: string; code: string; region_id: string }
  > = {};
  const wards: Record<
    string,
    { id: string; name: string; code: string; district_id: string }
  > = {};
  const streets: Record<
    string,
    { id: string; name: string; code: string; ward_id: string }
  > = {};

  for (const file of files) {
    const content = await fs.readFile(path.join(LOCATIONS_DIR, file), "utf8");
    const records: Row[] = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
    for (const row of records) {
      // REGION
      console.log(row)
      const regionCode = row.REGIONCODE.trim();
      if (!regions[regionCode]) {
        const id = createId();
        regions[regionCode] = { id, name: row.REGION.trim(), code: regionCode };
        regionMap.set(regionCode, id);
      }
      // DISTRICT
      const districtCode = row.DISTRICTCODE.trim();
      if (!districts[districtCode]) {
        const region_id = regionMap.get(regionCode)!;
        const id = createId();
        districts[districtCode] = {
          id,
          name: row.DISTRICT.trim(),
          code: districtCode,
          region_id,
        };
        districtMap.set(districtCode, id);
      }
      // WARD
      const wardCode = row.WARDCODE.trim();
      if (!wards[wardCode]) {
        const district_id = districtMap.get(districtCode)!;
        const id = createId();
        wards[wardCode] = {
          id,
          name: row.WARD.trim(),
          code: wardCode,
          district_id,
        };
        wardMap.set(wardCode, id);
      }
      // STREET (optional, can be empty)
      const streetName = row.STREET?.trim();
      if (streetName && streetName.length > 0) {
        // Use a composite key: wardCode + streetName
        const streetKey = `${wardCode}::${streetName}`;
        if (!streets[streetKey]) {
          const ward_id = wardMap.get(wardCode)!;
          const id = createId();
          // Use streetName as code for uniqueness if no code in CSV
          streets[streetKey] = {
            id,
            name: streetName,
            code: streetName,
            ward_id,
          };
        }
      }
    }
  }

  // Insert in order: region, district, ward, street
  console.log(`Inserting ${Object.keys(regions).length} regions...`);
  for (const r of Object.values(regions)) {
    await db.insert(region).values(r).onConflictDoNothing();
  }
  console.log(`Inserting ${Object.keys(districts).length} districts...`);
  for (const d of Object.values(districts)) {
    await db.insert(district).values(d).onConflictDoNothing();
  }
  console.log(`Inserting ${Object.keys(wards).length} wards...`);
  for (const w of Object.values(wards)) {
    await db.insert(ward).values(w).onConflictDoNothing();
  }
  console.log(`Inserting ${Object.keys(streets).length} streets...`);
  for (const s of Object.values(streets)) {
    await db.insert(street).values(s).onConflictDoNothing();
  }
  console.log(
    "✅ Seeded all locations (regions, districts, wards, streets) from CSV files!"
  );
}

seedAllLocations()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
