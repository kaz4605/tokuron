import { sqliteTable, integer, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql, relations } from "drizzle-orm";
export const userTable = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  name: text("name", { length: 500 }).notNull(),
  email: text("email", { length: 200 }).notNull(),
  password: text("password", { length: 500 }).notNull(),
}, 
(table) => ({
  userEmailKey: uniqueIndex("user_email_key").on(table.email),
})
);
export const chatTable = sqliteTable("chat", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  ownerId: integer("ownerId").notNull()
    .references(() => userTable.id, {
      onUpdate: "cascade",
      onDelete: "cascade"
    }),
  name: text("name", { length: 1000 }).notNull(),
});
export const messageTable = sqliteTable("message", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  chatId: integer("chatId").notNull()
    .references(() => chatTable.id, {
      onUpdate: "cascade",
      onDelete: "cascade"
    }),
  type: text("type", { length: 100 }).notNull(),
  message: text("message").notNull(),
});
export const userRelations = relations(userTable, ({ many }) => ({
  chats: many(chatTable),
}));

export const chatRelations = relations(chatTable, ({ one, many }) => ({
  owner: one(userTable, {
    fields: [chatTable.ownerId],
    references: [userTable.id],
  }),
  messages: many(messageTable),
}));

export const messageRelations = relations(messageTable, ({ one }) => ({
  chat: one(chatTable, {
    fields: [messageTable.chatId],
    references: [chatTable.id],
  }),
}));
