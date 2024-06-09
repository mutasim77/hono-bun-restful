import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

class Database {
    private static instance: Database;
    private client: Client;
    private db: ReturnType<typeof drizzle> | undefined;

    private constructor() {
        const connectionString = process.env.POSTGRES_URI;
        if (!connectionString) {
            throw new Error("POSTGRES_URI environment variable is not defined");
        }
        this.client = new Client({
            connectionString,
        });
    }

    public static async getInstance(): Promise<Database> {
        if (!Database.instance) {
            Database.instance = new Database();
            await Database.instance.connect();
        }
        return Database.instance;
    }

    private async connect() {
        try {
            await this.client.connect();
            this.db = drizzle(this.client);
            console.log("PostgresDB Connected!");
        } catch (err) {
            console.error(`Error: ${(err as Error).message}`);
            throw err;
        }
    }

    public getDB() {
        if (!this.db) {
            throw new Error("Database not connected");
        }
        return this.db;
    }

    public async disconnect() {
        try {
            await this.client.end();
            console.log("PostgresDB Disconnected!");
        } catch (err) {
            console.error(`Error: ${(err as Error).message}`);
            throw err;
        }
    }
}

export default Database;
