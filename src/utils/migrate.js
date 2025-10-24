const fs = require("fs").promises;
const path = require("path");
const db = require("../config/db");

async function migrate() {
  try {
    await db.connect();
    const files = await fs.readdir(path.join(__dirname, "../../migrations"));
    const sqlFiles = files.filter((f) => f.endsWith(".sql")).sort();
    for (const file of sqlFiles) {
      console.log(`Executing migration: ${file}`);
      const sql = await fs.readFile(
        path.join(__dirname, "../../migrations", file),
        "utf-8"
      );
      await db.query(sql);
    }
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await db.end();
  }
}

migrate();
