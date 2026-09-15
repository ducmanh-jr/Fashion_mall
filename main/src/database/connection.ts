import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";

dotenv.config();

const rawPath = process.env.DB_PATH || "./src/database/fashion_mall.db";
const dbPath = path.isAbsolute(rawPath) ? rawPath : path.resolve(process.cwd(), rawPath);

const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

export const db = new DatabaseSync(dbPath);
db.exec("PRAGMA foreign_keys = ON;");

export function queryOne<T>(sql: string, ...params: any[]): T | undefined {
  const row = db.prepare(sql).get(...params);
  return (row as unknown as T) || undefined;
}

export function queryAll<T>(sql: string, ...params: any[]): T[] {
  const rows = db.prepare(sql).all(...params);
  return rows as unknown as T[];
}

export function execute(sql: string, ...params: any[]): any {
  return db.prepare(sql).run(...params);
}

export default db;
