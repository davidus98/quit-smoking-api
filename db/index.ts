import { drizzle } from "drizzle-orm/node-postgres"
import pg from "pg"
const { Client } = pg
import config from "config"
import { PostgresConfig } from "../types/config"

const dbConfig = config.get<PostgresConfig>("postgres")

const client = new Client({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
})

export async function connectDB() {
  try {
    await client.connect()
    console.log("Connected to PostgreSQL")

    const db = drizzle(client)
    return db
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to PostgreSQL:", error.stack)
    } else {
      console.error(
        "Unknown error occurred during PostgreSQL connection:",
        error
      )
    }
    throw error
  }
}

export { client }
