import { asc, eq, inArray } from 'drizzle-orm';
import { db } from './db/client.js';
import { athletes, exercisePrescriptions, prescriptionSets, mesocycles, trainingWeeks, workoutDays, movements, exercises, exerciseVariants, workoutSessions, exercisePerformances, setLogs } from './db/schema/index.js';
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
  async getWeek(id: string) { return (await requireDb().select().from(trainingWeeks).where(eq(trainingWeeks.id, id)))[0]; },
  async getDay(id: string) { return (await requireDb().select().from(workoutDays).where(eq(workoutDays.id, id)))[0]; },
  async getPrescription(id: string) { return (await requireDb().select().from(exercisePrescriptions).where(eq(exercisePrescriptions.id, id)))[0]; },
  async getPrescriptionSet(id: string) { return (await requireDb().select().from(prescriptionSets).where(eq(prescriptionSets.id, id)))[0]; },
  async createPrescription(input: typeof exercisePrescriptions.$inferInsert, sets: Omit<typeof prescriptionSets.$inferInsert, 'exercisePrescriptionId'>[]) { return requireDb().transaction(async (tx) => { const prescription = (await tx.insert(exercisePrescriptions).values(input).returning())[0]; if (!prescription) throw new Error('Prescription creation failed'); const createdSets = sets.length ? await tx.insert(prescriptionSets).values(sets.map((set) => ({ ...set, exercisePrescriptionId: prescription.id }))).returning() : []; return { ...prescription, sets: createdSets }; }); },
  async getPlan(id: string) { const mesocycle = await this.getMesocycle(id); if (!mesocycle) return undefined; const database = requireDb(); const weeks = await database.select().from(trainingWeeks).where(eq(trainingWeeks.mesocycleId, id)); const days = weeks.length ? await database.select().from(workoutDays).where(inArray(workoutDays.trainingWeekId, weeks.map((week) => week.id))) : []; const prescriptions = days.length ? await database.select().from(exercisePrescriptions).where(inArray(exercisePrescriptions.workoutDayId, days.map((day) => day.id))) : []; const sets = prescriptions.length ? await database.select().from(prescriptionSets).where(inArray(prescriptionSets.exercisePrescriptionId, prescriptions.map((prescription) => prescription.id))) : []; return { ...mesocycle, weeks: weeks.map((week) => ({ ...week, days: days.filter((day) => day.trainingWeekId === week.id).map((day) => ({ ...day, prescriptions: prescriptions.filter((prescription) => prescription.workoutDayId === day.id).map((prescription) => ({ ...prescription, sets: sets.filter((set) => set.exercisePrescriptionId === prescription.id) })) })) })) }; },
  async createSession(input: typeof workoutSessions.$inferInsert) { return (await requireDb().insert(workoutSessions).values(input).returning())[0]; },
  async getSession(id: string) { const database = requireDb(); const session = (await database.select().from(workoutSessions).where(eq(workoutSessions.id, id)))[0]; if (!session) return undefined; const performances = await database.select().from(exercisePerformances).where(eq(exercisePerformances.workoutSessionId, id)).orderBy(asc(exercisePerformances.sequenceNumber)); const performanceSets = performances.length ? await database.select().from(setLogs).where(inArray(setLogs.exercisePerformanceId, performances.map((performance) => performance.id))).orderBy(asc(setLogs.setNumber)) : []; return { ...session, exercises: performances.map((performance) => ({ ...performance, sets: performanceSets.filter((set) => set.exercisePerformanceId === performance.id) })) }; },
  async createPerformance(input: typeof exercisePerformances.$inferInsert) { return (await requireDb().insert(exercisePerformances).values(input).returning())[0]; },
  async getPerformance(id: string) { return (await requireDb().select().from(exercisePerformances).where(eq(exercisePerformances.id, id)))[0]; },
  async createSetLog(input: typeof setLogs.$inferInsert) { return (await requireDb().insert(setLogs).values(input).returning())[0]; },
  async completeSession(id: string, completedAt: Date) { return (await requireDb().update(workoutSessions).set({ completedAt, updatedAt: new Date() }).where(eq(workoutSessions.id, id)).returning())[0]; },
};
