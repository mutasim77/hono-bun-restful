import {
    describe,
    expect,
    it,
    beforeAll,
    beforeEach,
    afterAll
} from 'bun:test';
import { Database } from '../src/config';

describe('Database Test', () => {
    let dbInstance: Database;

    beforeAll(async () => {
        if (!process.env.POSTGRES_URI) {
            throw new Error("POSTGRES_URI environment variable is not defined");
        }
    });

    beforeEach(async () => {
        dbInstance = await Database.getInstance();
    });

    afterAll(async () => {
        if (dbInstance) {
            await dbInstance.disconnect();
        }
    });

    it('should create a single instance', async () => {
        const dbInstance1 = await Database.getInstance();
        const dbInstance2 = await Database.getInstance();
        expect(dbInstance1).toBe(dbInstance2);
    });

    it('should connect to the database', async () => {
        const dbClient = dbInstance.getDB();
        const res = await dbClient.query('SELECT NOW()');
        expect(res.rowCount).toBe(1);
    });

    it('should throw an error if POSTGRES_URI is not defined', () => {
        delete process.env.POSTGRES_URI;
        expect(() => new (Database as any)()).toThrow('POSTGRES_URI environment variable is not defined');
    });

    it('should return the db instance after connection', async () => {
        const dbClient = dbInstance.getDB();
        expect(dbClient).toBeDefined();
    });

    it('should disconnect from the database', async () => {
        await dbInstance.disconnect();
        expect(() => dbInstance.getDB()).toThrow('Database not connected');
    });
});
