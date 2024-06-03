import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
const { Client } = require("pg");
import * as schema from "./schema.ts";

export const client = new Client({
  connectionString: process.env.DATABASE_URL as string,
});

const main = async () => {
  await client.connect(); //connect to the database
};

main();
const db = drizzle(client, { schema, logger: true });

export default db;
