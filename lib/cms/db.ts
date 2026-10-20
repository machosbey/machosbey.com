import 'server-only';
import mysql from 'mysql2/promise';
let pool: mysql.Pool | undefined;
let initialized: Promise<void> | undefined;
export const configured = () => Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_NAME);
export function db() {
  if (!configured()) throw new Error('DATABASE_NOT_CONFIGURED');
  return pool ??= mysql.createPool({ host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306), user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, connectionLimit: 4, queueLimit: 30, connectTimeout: 10000, charset: 'utf8mb4', multipleStatements: false, ...(process.env.DB_SSL === 'true' ? {ssl: {rejectUnauthorized:true}} : {}) });
}
export async function init() {
  if (!initialized) initialized = (async () => {
    const statements = [
      `CREATE TABLE IF NOT EXISTS cms_admin (id INT PRIMARY KEY, email VARCHAR(254) NOT NULL, password_hash VARCHAR(255) NOT NULL)`,
      `CREATE TABLE IF NOT EXISTS cms_sessions (token_hash CHAR(64) PRIMARY KEY, admin_id INT NOT NULL, expires_at BIGINT NOT NULL)`,
      `CREATE TABLE IF NOT EXISTS cms_limits (bucket CHAR(64) PRIMARY KEY, attempts INT NOT NULL, reset_at BIGINT NOT NULL)`,
      `CREATE TABLE IF NOT EXISTS cms_content (id INT PRIMARY KEY, draft LONGTEXT NOT NULL, published LONGTEXT NOT NULL, version INT NOT NULL DEFAULT 0, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`,
      `CREATE TABLE IF NOT EXISTS cms_revisions (id INT AUTO_INCREMENT PRIMARY KEY, content LONGTEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
      `CREATE TABLE IF NOT EXISTS cms_media (id CHAR(36) PRIMARY KEY, name VARCHAR(200) NOT NULL, mime VARCHAR(40) NOT NULL, data MEDIUMBLOB NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
    ];
    for (const sql of statements) await db().execute(sql+' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
    await db().execute('INSERT IGNORE INTO cms_content (id,draft,published) VALUES (1,?,?)', ['{}','{}']);
  })().catch(error => { initialized=undefined; throw error; });
  await initialized;
}
