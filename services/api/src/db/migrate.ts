import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './client.js';
if (!db || !pool) throw new Error('DATABASE_URL is required to run migrations');
await migrate(db, { migrationsFolder: './src/db/migrations' });
await pool.end();
