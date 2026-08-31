export type MovementPattern = 'SQUAT' | 'HINGE' | 'HORIZONTAL_PRESS' | 'VERTICAL_PRESS' | 'HORIZONTAL_PULL' | 'VERTICAL_PULL' | 'KNEE_EXTENSION' | 'KNEE_FLEXION' | 'HIP_EXTENSION' | 'HIP_ABDUCTION' | 'HIP_ADDUCTION' | 'PLANTAR_FLEXION' | 'ELBOW_FLEXION' | 'ELBOW_EXTENSION' | 'OTHER';
export type ExerciseRole = 'PRIMARY' | 'SECONDARY' | 'VARIATION' | 'ACCESSORY' | 'HYPERTROPHY' | 'REHAB' | 'TECHNIQUE';
export type CaffeineSourceType = 'COFFEE' | 'TEA' | 'MATCHA' | 'ENERGY_DRINK' | 'PRE_WORKOUT' | 'SUPPLEMENT' | 'OTHER';
export type EstimationMethod = 'LABEL' | 'USER_ESTIMATE' | 'DATABASE' | 'UNKNOWN';
export type ContextMoment = 'MORNING' | 'PRE_WORKOUT' | 'END_OF_DAY';

export type Recommendation<T> = { value: T; confidence: number; reasons: string[]; evidence?: string[] };

export class WeightKg { readonly value: number; constructor(value: number) { assertFiniteNonNegative(value, 'Weight'); this.value = value; } }
export class Reps { readonly value: number; constructor(value: number) { if (!Number.isInteger(value) || value < 0) throw new Error('Reps must be a non-negative integer'); this.value = value; } }
export class Rir { readonly value: number; constructor(value: number) { assertFiniteNonNegative(value, 'RIR'); this.value = value; } }
export class Rpe { readonly value: number; constructor(value: number) { if (!Number.isFinite(value) || value < 0 || value > 10) throw new Error('RPE must be between 0 and 10'); this.value = value; } }

export type EquipmentProfile = { name: string; barWeightKg?: WeightKg; availablePlatesKg: WeightKg[]; machineIncrementsKg?: WeightKg[] };
export type CaffeineIntake = { consumedAt: Date; sourceType: CaffeineSourceType; caffeineMg: number; estimationMethod: EstimationMethod };
export type Movement = { id: string; name: string; pattern: MovementPattern };
export type Exercise = { id: string; movementId: string; name: string; role: ExerciseRole };
export type ExerciseVariant = { id: string; exerciseId: string; name: string; modifiers: string[] };

function assertFiniteNonNegative(value: number, label: string): void { if (!Number.isFinite(value) || value < 0) throw new Error(`${label} must be non-negative`); }
