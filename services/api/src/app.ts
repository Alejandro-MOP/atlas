import Fastify from 'fastify';
import type { HealthResponse } from '@atlas/contracts';
export function buildApp() { const app = Fastify({ logger: true }); app.get('/health', async (): Promise<HealthResponse> => ({ status: 'ok', service: 'atlas-api' })); return app; }
