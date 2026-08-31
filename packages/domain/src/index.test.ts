import { describe, expect, it } from 'vitest';
import { Recommendation, Reps, Rpe, WeightKg } from './index.js';
describe('domain value objects', () => {
  it('validates training invariants', () => { expect(() => new WeightKg(-1)).toThrow(); expect(() => new Reps(2.5)).toThrow(); expect(() => new Rpe(11)).toThrow(); });
  it('represents explainable recommendations', () => { const result: Recommendation<WeightKg> = { value: new WeightKg(100), confidence: 0.8, reasons: ['exact variant history'] }; expect(result.confidence).toBe(0.8); });
});
