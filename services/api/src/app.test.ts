import { describe, expect, it } from 'vitest';
import { buildApp } from './app.js';
describe('GET /health', () => { it('returns API health', async () => { const response = await buildApp().inject({ method: 'GET', url: '/health' }); expect(response.statusCode).toBe(200); expect(response.json()).toEqual({ status: 'ok', service: 'atlas-api' }); }); });
