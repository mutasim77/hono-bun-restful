import { DefaultLogger, LogWriter } from 'drizzle-orm/logger';
import * as fs from 'fs';
import * as path from 'path';

class MyLogWriter implements LogWriter {
    private logFilePath: string;

    constructor(logFilePath: string) {
        this.logFilePath = logFilePath;
    }

    write(message: string) {
        const formattedMessage = `[${new Date().toISOString()}] ${message}\n`;

        // Write to stdout
        console.log(formattedMessage);

        // Write to a log file
        fs.appendFile(this.logFilePath, formattedMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        })
    }
}

const logFilePath = path.resolve('logs', 'app.log');

export const logger = new DefaultLogger({
    writer: new MyLogWriter(logFilePath)
});
