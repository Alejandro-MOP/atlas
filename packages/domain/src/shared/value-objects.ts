export class WeightKg { readonly value: number; constructor(value: number) { if (!Number.isFinite(value) || value < 0) throw new Error('Weight must be non-negative'); this.value = value; } }
export class Reps { readonly value: number; constructor(value: number) { if (!Number.isInteger(value) || value <= 0) throw new Error('Reps must be a positive integer'); this.value = value; } }
export class Rir { readonly value: number; constructor(value: number) { if (!Number.isFinite(value) || value < 0) throw new Error('RIR must be non-negative'); this.value = value; } }
export class Rpe { readonly value: number; constructor(value: number) { if (!Number.isFinite(value) || value < 0 || value > 10) throw new Error('RPE must be between 0 and 10'); this.value = value; } }
export function nonEmpty(value: string, field: string): string { if (!value.trim()) throw new Error(`${field} must not be empty`); return value; }
export function positive(value: number, field: string): number { if (!Number.isInteger(value) || value <= 0) throw new Error(`${field} must be positive`); return value; }
