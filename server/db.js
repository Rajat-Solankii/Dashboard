import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create default admin user if none exists
const stmt = db.prepare('SELECT COUNT(*) as count FROM users');
const row = stmt.get();
if (row.count === 0) {
  const hash = bcrypt.hashSync('password123', 10);
  const insert = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
  insert.run('Admin User', 'admin@insight.com', hash);
  console.log('Default admin user created.');
}

export default db;
