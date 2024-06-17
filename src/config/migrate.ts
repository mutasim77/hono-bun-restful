import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing');
}

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

async function runMigrations() {
    try {
        await migrate(drizzle(migrationClient), {
            migrationsFolder: 'src/migrations'
        })

        console.log('Migrated Successfully! 🐥');
    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    } finally {
        await migrationClient.end();
    }
}

(async function main() {
    try {
        await runMigrations();
    } catch (_) {
        process.exit(1);
    }
})();