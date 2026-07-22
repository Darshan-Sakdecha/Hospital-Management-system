import fs from "fs";
import path from "path";

export const logger = (req, res, next) => {
    const log = `${new Date().toISOString()} | ${req.method} | ${req.originalUrl} | IP: ${req.ip}\n`;

    const filePath = path.join("logs", "logs.txt");

    fs.appendFile(filePath, log, (err) => {
        if (err) console.log(err);
    });

    next();
}