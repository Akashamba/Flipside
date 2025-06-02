// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `flipside_${name}`);

export const articles = createTable(
  "article",
  (d) => ({
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(), // Clerk user ID
    url: text("url").notNull(),
    title: text("title"),
    description: text("description"),
    tags: text("tags"),
    createdAt: timestamp("created_at").defaultNow(),
  }),
  (t) => [index("title_idx").on(t.title)],
);
