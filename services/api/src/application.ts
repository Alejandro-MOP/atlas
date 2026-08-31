import type { CreateAthleteInput, CreateExerciseInput, CreateExercisePrescriptionInput, CreateExerciseVariantInput, CreateMesocycleInput, CreateMovementInput, CreateTrainingWeekInput, CreateWorkoutDayInput } from '@atlas/contracts';
import { repositories } from './repositories.js';
export const application = {
  createAthlete: (input: CreateAthleteInput) => repositories.createAthlete(input),
  createMovement: (input: CreateMovementInput) => repositories.createMovement(input),
  getMovement: (id: string) => repositories.getMovement(id),
  async createExercise(input: CreateExerciseInput) { if (input.movementId && !(await repositories.getMovement(input.movementId))) throw new Error('Movement not found'); return repositories.createExercise(input); },
  getExercise: (id: string) => repositories.getExercise(id),
  async createVariant(input: CreateExerciseVariantInput) { if (!(await repositories.getExercise(input.exerciseId))) throw new Error('Exercise not found'); return repositories.createVariant(input); },
  getVariant: (id: string) => repositories.getVariant(id),
  createMesocycle: (input: CreateMesocycleInput) => repositories.createMesocycle({ ...input, startDate: input.startDate?.toISOString().slice(0, 10), endDate: input.endDate?.toISOString().slice(0, 10) }),
  createTrainingWeek: (input: CreateTrainingWeekInput) => repositories.createWeek(input),
  createWorkoutDay: (input: CreateWorkoutDayInput) => repositories.createDay(input),
  async createExercisePrescription({ sets, ...prescription }: CreateExercisePrescriptionInput) { if (!(await repositories.getExercise(prescription.exerciseId))) throw new Error('Exercise not found'); if (prescription.exerciseVariantId) { const variant = await repositories.getVariant(prescription.exerciseVariantId); if (!variant || variant.exerciseId !== prescription.exerciseId) throw new Error('Exercise variant does not belong to exercise'); } return repositories.createPrescription(prescription, sets); },
};
