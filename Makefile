run:
	bun run dev

test:
	bun test index.test.ts

migrate: 
	bun drizzle-kit generate
	bun run src/config/migrate.ts

remove_migrations:
	bun drizzle-kit drop

run_studio:
	bunx drizzle-kit studio
