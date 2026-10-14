import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';
export const aiUsage = sqliteTable('ai_usage', {
 id: text('id').primaryKey(),
 userHash: text('user_hash').notNull(),
 createdAt: integer('created_at').notNull(),
 units: integer('units').notNull(),
}, table => [index('usage_time_idx').on(table.createdAt), index('usage_user_time_idx').on(table.userHash,table.createdAt)]);
