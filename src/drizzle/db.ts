import "dotenv/config";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const client = new Client({
  connectionString: process.env.DATABASE_URL as string,
});

await client.connect();
const db = drizzle(client, { schema, logger: true });

export default db;
