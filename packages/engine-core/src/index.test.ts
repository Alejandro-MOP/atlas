import { describe, expect, it } from 'vitest';
import { NearestPlateLoadRoundingService } from './index.js';
describe('LoadRoundingService', () => { it('rounds to physically loadable bilateral plates', () => { const service = new NearestPlateLoadRoundingService(); expect(service.round(103, { name: 'test', availablePlatesKg: [{ value: 2.5 }] })).toBe(105); }); });
