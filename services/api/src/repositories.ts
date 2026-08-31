import { eq, inArray } from 'drizzle-orm';
import { db } from './db/client.js';
import { athletes, exercisePrescriptions, prescriptionSets, mesocycles, trainingWeeks, workoutDays, movements, exercises, exerciseVariants } from './db/schema/index.js';
type Database = NonNullable<typeof db>;
export function requireDb(): Database { if (!db) throw new Error('DATABASE_URL is required for persistence endpoints'); return db; }
export const repositories = {
  async createAthlete(input: { displayName: string }) { return (await requireDb().insert(athletes).values(input).returning())[0]; },
  async getAthlete(id: string) { return (await requireDb().select().from(athletes).where(eq(athletes.id, id)))[0]; },
  async createMovement(input: typeof movements.$inferInsert) { return (await requireDb().insert(movements).values(input).returning())[0]; },
  async getMovement(id: string) { return (await requireDb().select().from(movements).where(eq(movements.id, id)))[0]; },
  async createExercise(input: typeof exercises.$inferInsert) { return (await requireDb().insert(exercises).values(input).returning())[0]; },
  async getExercise(id: string) { return (await requireDb().select().from(exercises).where(eq(exercises.id, id)))[0]; },
  async createVariant(input: typeof exerciseVariants.$inferInsert) { return (await requireDb().insert(exerciseVariants).values(input).returning())[0]; },
  async getVariant(id: string) { return (await requireDb().select().from(exerciseVariants).where(eq(exerciseVariants.id, id)))[0]; },
  async createMesocycle(input: typeof mesocycles.$inferInsert) { return (await requireDb().insert(mesocycles).values(input).returning())[0]; },
  async getMesocycle(id: string) { return (await requireDb().select().from(mesocycles).where(eq(mesocycles.id, id)))[0]; },
  async createWeek(input: typeof trainingWeeks.$inferInsert) { return (await requireDb().insert(trainingWeeks).values(input).returning())[0]; },
  async createDay(input: typeof workoutDays.$inferInsert) { return (await requireDb().insert(workoutDays).values(input).returning())[0]; },
  async createPrescription(input: typeof exercisePrescriptions.$inferInsert, sets: Omit<typeof prescriptionSets.$inferInsert, 'exercisePrescriptionId'>[]) { return requireDb().transaction(async (tx) => { const prescription = (await tx.insert(exercisePrescriptions).values(input).returning())[0]; if (!prescription) throw new Error('Prescription creation failed'); const createdSets = sets.length ? await tx.insert(prescriptionSets).values(sets.map((set) => ({ ...set, exercisePrescriptionId: prescription.id }))).returning() : []; return { ...prescription, sets: createdSets }; }); },
  async getPlan(id: string) { const mesocycle = await this.getMesocycle(id); if (!mesocycle) return undefined; const database = requireDb(); const weeks = await database.select().from(trainingWeeks).where(eq(trainingWeeks.mesocycleId, id)); const days = weeks.length ? await database.select().from(workoutDays).where(inArray(workoutDays.trainingWeekId, weeks.map((week) => week.id))) : []; const prescriptions = days.length ? await database.select().from(exercisePrescriptions).where(inArray(exercisePrescriptions.workoutDayId, days.map((day) => day.id))) : []; const sets = prescriptions.length ? await database.select().from(prescriptionSets).where(inArray(prescriptionSets.exercisePrescriptionId, prescriptions.map((prescription) => prescription.id))) : []; return { ...mesocycle, weeks: weeks.map((week) => ({ ...week, days: days.filter((day) => day.trainingWeekId === week.id).map((day) => ({ ...day, prescriptions: prescriptions.filter((prescription) => prescription.workoutDayId === day.id).map((prescription) => ({ ...prescription, sets: sets.filter((set) => set.exercisePrescriptionId === prescription.id) })) })) })) }; },
};
