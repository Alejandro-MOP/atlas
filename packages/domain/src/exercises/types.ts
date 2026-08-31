export type MovementPattern = 'SQUAT' | 'HINGE' | 'HORIZONTAL_PRESS' | 'VERTICAL_PRESS' | 'HORIZONTAL_PULL' | 'VERTICAL_PULL' | 'KNEE_EXTENSION' | 'KNEE_FLEXION' | 'HIP_EXTENSION' | 'HIP_ABDUCTION' | 'HIP_ADDUCTION' | 'PLANTAR_FLEXION' | 'ELBOW_FLEXION' | 'ELBOW_EXTENSION' | 'OTHER';
export type ExerciseRole = 'PRIMARY' | 'SECONDARY' | 'VARIATION' | 'ACCESSORY' | 'HYPERTROPHY' | 'REHAB' | 'TECHNIQUE';
export type Movement = { id: string; name: string; movementPattern: MovementPattern };
export type Exercise = { id: string; movementId?: string; name: string; defaultRole?: ExerciseRole };
export type ExerciseVariant = { id: string; exerciseId: string; name: string; modifiers: Record<string, unknown> };
