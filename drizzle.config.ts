import { defineConfig } from "drizzle-kit"
import config from "config"
import { PostgresConfig } from "./types/config"

const dbConfig = config.get<PostgresConfig>("postgres")

const connectionString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
  verbose: true,
  strict: true,
})
