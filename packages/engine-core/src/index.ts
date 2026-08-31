import type { EquipmentProfile } from '@atlas/domain';
export interface LoadAdjustmentEngine { adjust(input: unknown): unknown; }
export interface ProgressionEngine { recommend(input: unknown): unknown; }
export interface PivotEngine { plan(input: unknown): unknown; }
export interface WarmupEngine { plan(input: unknown): unknown; }
export interface ReadinessEngine { assess(input: unknown): unknown; }
export interface FatigueEngine { assess(input: unknown): unknown; }
export interface LoadRoundingService { round(loadKg: number, equipment: EquipmentProfile): number; }
export class NearestPlateLoadRoundingService implements LoadRoundingService {
  round(loadKg: number, equipment: EquipmentProfile): number { if (!Number.isFinite(loadKg) || loadKg < 0) throw new Error('Load must be non-negative'); const increment = Math.min(...equipment.availablePlatesKg.map((p) => p.value).filter((p) => p > 0)); if (!Number.isFinite(increment)) return loadKg; return Math.round(loadKg / (increment * 2)) * increment * 2; }
}
