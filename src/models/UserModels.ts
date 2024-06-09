import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});
