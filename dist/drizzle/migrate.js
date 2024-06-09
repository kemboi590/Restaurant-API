"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// migrate.ts
const migrator_1 = require("drizzle-orm/neon-http/migrator");
const db_1 = require("./db");
async function migration() {
    try {
        console.log("======Migration Started ======");
        await (0, migrator_1.migrate)(db_1.db, { migrationsFolder: __dirname + "/migrations" });
        console.log("======Migration Ended======");
        process.exit(0);
    }
    catch (error) {
        console.error("Migration failed with error: ", error);
        process.exit(1);
    }
}
migration().catch((e) => {
    console.error("Unexpected error during migration:", e);
    process.exit(1);
});
