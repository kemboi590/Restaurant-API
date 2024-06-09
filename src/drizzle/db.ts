import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL as string;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in environment variables.");
}

console.log("Creating neon client...");
const sql = neon(databaseUrl);

console.log("Initializing drizzle ORM...");
export const db = drizzle(sql, { schema, logger: true });
