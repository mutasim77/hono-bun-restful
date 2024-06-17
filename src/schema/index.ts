import { serial, text, timestamp, pgTable, uuid } from 'drizzle-orm/pg-core';

export const UserTable = pgTable('user', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').defaultRandom(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});