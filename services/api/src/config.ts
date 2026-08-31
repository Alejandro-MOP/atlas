import 'dotenv/config';
export const config = { port: Number(process.env.API_PORT ?? 3000), databaseUrl: process.env.DATABASE_URL };
