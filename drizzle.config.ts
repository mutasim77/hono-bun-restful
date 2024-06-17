import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/schema/index.ts',
    out: './src/migrations',
    dialect: 'postgresql',
    verbose: true,
    strict: true,
    dbCredentials: {
        url: process.env.POSTGRES_URI!
    }
})