import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  created_at: timestamp("created_at").defaultNow(),
});

export type User = {
  username: string;
  email: string;
  created_at: string;
};

export const progress = pgTable("progress", {
  id: uuid("id").primaryKey(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  date: timestamp("date").defaultNow(),
  cigarettes_smoked: integer("cigarettes_smoked").notNull(),
  notes: varchar("notes", { length: 500 }),
});
