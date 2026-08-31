import { describe, expect, it } from 'vitest';
import { buildApp } from './app.js';
describe('GET /health', () => { it('returns API health', async () => { const response = await buildApp().inject({ method: 'GET', url: '/health' }); expect(response.statusCode).toBe(200); expect(response.json()).toEqual({ status: 'ok', service: 'atlas-api' }); }); });
describe('planned input validation', () => {
  it('rejects invalid RPE and target reps at HTTP boundary', async () => { const app = buildApp(); const response = await app.inject({ method: 'POST', url: '/workout-days/00000000-0000-0000-0000-000000000001/prescriptions', payload: { exerciseId: '00000000-0000-0000-0000-000000000002', exerciseRole: 'PRIMARY', sortOrder: 1, sets: [{ setNumber: 1, targetReps: 0, targetRpe: 11 }] } }); expect(response.statusCode).toBe(400); });
});
