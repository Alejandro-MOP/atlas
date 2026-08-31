import { describe, expect, it } from 'vitest';
import { Recommendation, Reps, Rpe, WeightKg, validateMesocycle, validatePrescriptionSet, validateTrainingWeek } from './index.js';
describe('domain value objects', () => {
  it('validates training invariants', () => { expect(() => new WeightKg(-1)).toThrow(); expect(() => new Reps(2.5)).toThrow(); expect(() => new Rpe(11)).toThrow(); });
  it('represents explainable recommendations', () => { const result: Recommendation<WeightKg> = { value: new WeightKg(100), confidence: 0.8, reasons: ['exact variant history'] }; expect(result.confidence).toBe(0.8); });
  it('validates planned training entities', () => { expect(() => validateMesocycle({ athleteId: 'a', name: 'Meso', status: 'DRAFT', sequenceNumber: 0 })).toThrow(); expect(() => validateTrainingWeek({ mesocycleId: 'm', weekNumber: 0 })).toThrow(); expect(() => validatePrescriptionSet({ setNumber: 1, targetReps: 10, minReps: 12, maxReps: 8 })).toThrow(); });
});
