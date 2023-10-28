// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { InferModel, InferModelFromColumns, InferSelectModel, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `todoing_${name}`);

export const todos = mysqlTable(
  "todos",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    todo: varchar("content", { length: 256 }),
    done: boolean('done').default(false).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (table) => ({
    todoIndex: index("todo_idx").on(table.todo)
  })
)

export type Todo = InferSelectModel<typeof todos>