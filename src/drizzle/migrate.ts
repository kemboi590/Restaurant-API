import "dotenv/config";

import db, { client } from "./db";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function migration() {
  console.log("======Migration Started ======");
  await migrate(db, { migrationsFolder: __dirname + "/migrations" }); // Run the migration of the database
  await client.end(); // Close the connection to the database
  console.log(" ======Migration Ended======");
  process.exit(0);
}

migration().catch((e) => {
  console.log(e);
  process.exit(1);
});
