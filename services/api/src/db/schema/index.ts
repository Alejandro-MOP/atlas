import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
export const foundationMetadata = pgTable('foundation_metadata', { id: uuid('id').defaultRandom().primaryKey(), createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull() });
