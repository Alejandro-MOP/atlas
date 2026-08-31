# ATLAS

**Adaptive Training & Load Analysis System** es una plataforma de seguimiento y asistencia para fuerza, powerlifting e hipertrofia.

## Current Status

ATLAS está en F1 — Training Tracker. F0, F1-001A y F1-002 están completas; F1-003 es el siguiente paso. El modelo ACTUAL ya permite registrar sesiones, performances y sets, pero todavía no existen recomendaciones ni analytics.

## Tech Stack

- Node.js 22+ y TypeScript strict.
- pnpm workspaces.
- Expo, React Native y Expo Router.
- Fastify sobre Node.js.
- PostgreSQL y Drizzle ORM.
- Vitest, ESLint y Prettier.

## Architecture

ATLAS es un modular monolith. La dirección de dependencias es:

```text
Mobile
  ↓
API
  ↓
Application
 ↙       ↘
Domain   Engine Core
  ↓
Repositories
  ↓
PostgreSQL
```

`packages/domain` y `packages/engine-core` son puros: no dependen de React Native, Fastify, Drizzle ni PostgreSQL. `services/api` coordina HTTP, aplicación y persistencia. Los engines futuros serán determinísticos y reutilizables; mobile no contiene lógica central de recomendaciones.

## Repository Structure

```text
apps/mobile          Expo + Expo Router
services/api         Fastify, application, repositories y Drizzle
packages/domain      entidades, tipos y value objects
packages/contracts   DTOs y validación compartida con Zod
packages/engine-core puertos de engines y load rounding
ROADMAP.md           delivery y dirección futura
EXECUTIVE_REPORT.md  visión y estado de producto
```

## Training Domain

El modelo prescrito persistente es:

```text
Athlete
└── Mesocycle
    └── TrainingWeek
        └── WorkoutDay
            └── ExercisePrescription
                └── PrescriptionSet
```

Las prescriptions se relacionan con `Movement → Exercise → ExerciseVariant`. `ExerciseVariant.modifiers` es JSON estructurado para tempo, pausas, postura y otros modificadores sin crear cientos de columnas.

## Planned vs Actual Training

F1-001 implementó únicamente `PLANNED`:

```text
Athlete → Mesocycle → TrainingWeek → WorkoutDay → ExercisePrescription → PrescriptionSet
```

`ACTUAL` será una capa separada y futura:

```text
WorkoutSession → SessionExercise / ExercisePerformance → SetLog
```

El modelo ACTUAL ya permite sesiones reales y set logs; F1-002 no calcula recomendaciones, fatigue, volumen ni analytics.

## Exercise Model

El catálogo actual distingue movement, exercise y variant. `MovementPattern` y `ExerciseRole` son enums compartidos entre dominio, contratos y PostgreSQL. Las relaciones incluyen validación de existencia y una variant debe pertenecer al exercise usado por una prescription.

## Recommendation Architecture

El contrato preparado es `Recommendation<T>` con `value`, `confidence`, `reasons` y `evidence` opcional. `engine-core` expone puertos para engines futuros, pero no implementa recomendaciones ni LoadAdjustmentEngine funcional.

## Equipment / Load Rounding

`EquipmentProfile` y `NearestPlateLoadRoundingService` permiten redondeo puro según discos configurados. No hay perfiles de gimnasio hardcodeados.

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | Estado de la API |
| POST | `/athletes` | Crear atleta |
| GET | `/athletes/:id` | Consultar atleta |
| POST | `/movements` | Crear movement |
| GET | `/movements/:id` | Consultar movement |
| POST | `/exercises` | Crear exercise |
| GET | `/exercises/:id` | Consultar exercise |
| POST | `/exercises/:exerciseId/variants` | Crear variant |
| GET | `/exercise-variants/:id` | Consultar variant |
| POST | `/mesocycles` | Crear mesociclo |
| GET | `/mesocycles/:id` | Consultar mesociclo |
| POST | `/mesocycles/:mesocycleId/weeks` | Crear semana |
| POST | `/training-weeks/:trainingWeekId/days` | Crear día |
| POST | `/workout-days/:workoutDayId/prescriptions` | Crear prescription y sets |
| GET | `/mesocycles/:id/plan` | Consultar plan anidado |
| POST | `/workout-sessions` | Crear sesión real |
| GET | `/workout-sessions/:id` | Consultar sesión con ejercicios y sets |
| POST | `/workout-sessions/:workoutSessionId/exercises` | Añadir ejercicio ejecutado |
| POST | `/exercise-performances/:exercisePerformanceId/sets` | Registrar set ejecutado |
| PATCH | `/workout-sessions/:id/complete` | Completar sesión |

## Database

PostgreSQL se ejecuta localmente con Docker Compose y se publica en `localhost:55432`. Drizzle mantiene schema y migraciones en `services/api/src/db`. Además de las tablas PLANNED, existen `workout_sessions`, `exercise_performances` y `set_logs` para ACTUAL.

```sh
corepack pnpm install
cp .env.example .env
docker compose up -d
corepack pnpm db:generate
corepack pnpm db:migrate
corepack pnpm db:seed
```

Variables: `DATABASE_URL` y `API_PORT`. No guardar secretos en el repositorio.

## Runtime Validation

Los contratos HTTP se validan con Zod antes de llegar a application services. Se comprueban IDs, strings, enums, rangos de RIR/RPE/peso, repeticiones, orden y coherencia min/max. PostgreSQL refuerza invariantes numéricas mediante CHECK constraints y relaciones mediante FKs.

## Development Setup

Requiere Node.js 22+ y pnpm 9.15.5. La API puede arrancar con `corepack pnpm dev:api`; mobile con `corepack pnpm dev:mobile`.

## Commands

```sh
corepack pnpm dev
corepack pnpm dev:api
corepack pnpm dev:mobile
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

## Testing / Quality

Vitest cubre invariantes de dominio, redondeo de carga y health/input validation de API. ESLint, TypeScript strict, build y Prettier forman la baseline de calidad.

## Architecture Decisions

- **Monorepo**: pnpm workspaces coordinan mobile, API y paquetes compartidos.
- **Modular monolith**: una API modular evita el coste prematuro de microservicios.
- **Domain / Engine / Infrastructure**: dominio y engines puros no conocen frameworks ni persistencia.
- **Exercise model**: `Movement → Exercise → ExerciseVariant → Modifiers / Execution Context`.
- **Personalization**: datos y configuración, nunca hardcodes de atletas, gimnasios o bebidas.
- **Recommendations**: value, confidence, reasons y evidence; la confianza refleja la evidencia.
- **Data handling**: registrar primero e interpretar después.
- **Apple platform**: HealthKit, Apple Health, Siri y Watch serán adaptadores futuros desacoplados.
- **PLANNED vs ACTUAL**: la prescription del coach y el desempeño del atleta son modelos separados.
- **Runtime validation**: Zod valida contratos HTTP en el límite de la aplicación.

## Documentation

- [ROADMAP.md](ROADMAP.md): delivery, estados y dirección futura.
- [EXECUTIVE_REPORT.md](EXECUTIVE_REPORT.md): visión, producto y estado ejecutivo.

## Documentation Maintenance

- README: actualizar cuando cambien arquitectura, setup, API, database, domain model o workflow.
- ROADMAP: actualizar cuando cambie el estado de una fase/ticket o aparezca una decisión futura.
- EXECUTIVE_REPORT: actualizar sólo ante cambios materiales de capacidades, visión, riesgos o dirección.
- Git: fuente de verdad del detalle histórico exacto.
