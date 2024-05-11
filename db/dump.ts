import { Pool, QueryResult } from "pg";
import fs from "fs";

// Define types
interface TableData {
  [key: string]: any;
}

// PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5433,
  database: "sgrap_db",
});

// Function to query data from all tables
async function fetchDataFromAllTables(): Promise<void> {
  const client = await pool.connect();
  try {
    // Get list of tables
    const result: QueryResult<{ table_name: string }> = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
    `);

    // Fetch data from each table
    for (const row of result.rows) {
      const tableName: string = row.table_name;
      const tableDataResult: QueryResult<TableData> = await client.query(
        `SELECT * FROM ${tableName};`
      );
      const jsonData: string = JSON.stringify(tableDataResult.rows);

      // Write JSON data to file
      const filePath: string = `./db/data/${tableName}.json`;
      fs.writeFileSync(filePath, jsonData);
      console.log(`Data from table '${tableName}' dumped to ${filePath}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    client.release();
  }
}

// Call the function to fetch data from all tables
fetchDataFromAllTables().then(() => {
  // Close the database pool after fetching data
  pool.end();
});
