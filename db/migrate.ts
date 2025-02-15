const { migrate } = require("drizzle-orm/neon-http/migrator");
import { client } from "./index";

const main = async () => {
  try {
    await migrate(client, { migrationsFolder: "migrations" });
    console.log("Migration completed");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};

main();
