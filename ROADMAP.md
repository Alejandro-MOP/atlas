# ATLAS Roadmap

**ATLAS — Adaptive Training & Load Analysis System**

Estados: ✅ COMPLETE · 🟡 IN PROGRESS · ⬜ PLANNED · ⏳ NEXT

ATLAS evolucionará desde un training tracker hacia un sistema cuantitativo que combine planificación prescrita, rendimiento real, carga, reps, RIR/RPE, variantes, historial, nutrición, cafeína, sueño, actividad, estrés, fatiga y equipamiento. Principios: ATLAS no reemplaza la autorregulación del atleta; la cuantifica. Registrar primero, interpretar después. Personalización por datos/configuración, no hardcode. Engines determinísticos primero y AI como explicación posterior. Recommendations explicables, confidence proporcional a la evidencia, correlación no implica causalidad y baja fricción: datos automáticos > quick input > advanced optional input.

## Estado y delivery

### F0 — Foundation · ✅ COMPLETE

Arquitectura base, monorepo, domain, contracts, engine-core, API, mobile, PostgreSQL/Drizzle y separación de engines.

### F1 — Training Tracker · 🟡 IN PROGRESS

Objetivo: representar entrenamiento prescrito y realizado.

```text
PLANNED: Athlete → Mesocycle → TrainingWeek → WorkoutDay → ExercisePrescription → PrescriptionSet
ACTUAL (futuro): WorkoutSession → SessionExercise / ExercisePerformance → SetLog
```

- **F1-001 — Training Domain + Persistence Model · ✅ COMPLETE**: modelo prescrito, persistencia y plan API.
- **F1-001A — Prescribed Model Hardening · ✅ COMPLETE**: hardening del catálogo, invariantes relacionales y cobertura adicional.
- **F1-002 — Workout Sessions + Set Logging · ⏳ NEXT**: modelo ACTUAL.
- **F1-003 — Mobile Training Experience · ⬜ PLANNED**: consultar planes, iniciar sesiones y registrar sets.

### F2 — Load Adjustment Engine · ⬜ PLANNED

Ajustar carga usando ejecución, RIR/RPE, objetivos, fatiga, historial y equipamiento. Toda recomendación tendrá razones y confidence.

### F3 — Athlete Context · ⬜ PLANNED

Registrar contexto longitudinal en MORNING, PRE_WORKOUT y END_OF_DAY.

### F4 — Nutrition & Caffeine · ⬜ PLANNED

Snapshots nutricionales y eventos temporales `CaffeineIntake`, con presets configurables.

### F5 — Apple Health · ⬜ PLANNED

Apple Watch → Apple Health/HealthKit → ATLAS Mobile → ATLAS API → PostgreSQL.

### F6 — Historical Import · ⬜ PLANNED

Importar históricos incompletos o sin fecha exacta usando fuente, confidence, secuencia y fecha aproximada.

### F7 — Analytics · ⬜ PLANNED

Analizar entrenamiento y contexto sin afirmar causalidad injustificada.

### F8 — Progression Engine · ⬜ PLANNED

Recomendar cargas futuras con evidencia de variante exacta, variante relacionada, ejercicio base o familia de movimiento.

### F9 — Pivot Engine · ⬜ PLANNED

Ayudar a seleccionar cargas iniciales de pivot weeks.

### F10 — Readiness & Fatigue · ⬜ PLANNED

Interpretar contexto acumulado con recomendaciones conservadoras y explicables.

### F11 — Powerlifting Engine · ⬜ PLANNED

Warmups, feeler sets, top-set decisions y backoffs.

### F12 — Siri & Apple Watch · ⬜ PLANNED

Reducir fricción con App Intents/Siri y Watch.

### F13 — ATLAS Intelligence · ⬜ PLANNED

Capa conversacional posterior a analytics y engines determinísticos; no reemplazará esos engines.

## Completed Milestones

- **F0-001 — Bootstrap + Architecture Foundation · ✅ COMPLETE**: monorepo, API, mobile, PostgreSQL/Drizzle, domain, contracts, engine-core, health endpoint y ADRs.
- **F1-001 — Training Domain + Persistence Model · ✅ COMPLETE**: modelo prescrito, persistencia, validación, seed y plan API.
- **F1-001A — Prescribed Model Hardening · ✅ COMPLETE**: catálogo usable, relaciones protegidas, constraints consistentes y flujo API probado.

## Idea Parking Lot

Ideas capturadas sin convertirlas en scope actual:

- Siri set logging; Apple Watch training UI; HealthKit sleep stages.
- Caffeine active estimation; work stress; sitting time.
- Historical mesocycles; pivot recommendations.
- Gym equipment profiles; machine increments; plate/load rounding.
- Competition attempt selection; configurable beverage presets.
- Pre-workout nutrition; session time-of-day analysis.
- Correlation between context and performance.

Detalles técnicos actuales: [README.md](README.md). Contexto de producto: [EXECUTIVE_REPORT.md](EXECUTIVE_REPORT.md).
