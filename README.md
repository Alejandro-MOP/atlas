# ATLAS

**Adaptive Training & Load Analysis System** es una plataforma futura de seguimiento y asistencia para fuerza, powerlifting e hipertrofia. Este repositorio contiene únicamente **ATLAS-F0-001 — Bootstrap + Architecture Foundation**.

## Estado actual

La foundation incluye un monorepo TypeScript con paquetes de dominio, contratos y engines puros; una API Fastify con `GET /health`; una app Expo Router mínima; y PostgreSQL/Drizzle preparado para crecer. No hay todavía tracker de entrenamientos, recomendaciones, catálogo de ejercicios ni reglas de negocio de F1.

## Arquitectura

`packages/domain` contiene tipos y value objects puros. `packages/contracts` contiene DTOs compartidos. `packages/engine-core` define puertos y un servicio puro de redondeo de carga. `services/api` coordina HTTP y la infraestructura Drizzle/PostgreSQL. `apps/mobile` contiene presentación y navegación. La API es un modular monolith, no microservicios.

## Inicio rápido

Requiere Node.js 22+ y pnpm 9.15.5.

```sh
pnpm install
cp .env.example .env
docker compose up -d       # opcional, PostgreSQL local
pnpm dev:api               # http://localhost:3000/health
pnpm dev:mobile            # Expo
```

Comandos de calidad: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`. El esquema Drizzle vive en `services/api/src/db/schema`; las migraciones se generan con `pnpm --filter @atlas/api db:generate` y se aplican con `pnpm --filter @atlas/api db:migrate`.

## Estructura

```text
apps/mobile       Expo + Expo Router
services/api      Fastify, configuración y Drizzle
packages/domain   entidades, value objects y reglas puras
packages/contracts DTOs HTTP compartidos
packages/engine-core puertos de engines y LoadRoundingService
docs/architecture contexto y mapa de dependencias
docs/adr          decisiones de arquitectura
```

## Roadmap

F0 Foundation · F1 Training Tracker · F2 Load Adjustment Engine · F3 Athlete Context · F4 Nutrition & Caffeine · F5 Apple Health · F6 Historical Import · F7 Analytics · F8 Progression Engine · F9 Pivot Engine · F10 Readiness & Fatigue · F11 Powerlifting Engine · F12 Siri & Apple Watch · F13 ATLAS Intelligence.

## Futuro y límites deliberados

El modelo contempla `Movement → Exercise → ExerciseVariant → Modifiers/Execution context`, perfiles de equipamiento por gimnasio, recomendaciones explicables con confidence y contextos MORNING/PRE_WORKOUT/END_OF_DAY. CaffeineIntake será un evento temporal. HealthKit, App Intents, Watch y AI Coach quedan documentados, sin dependencias nativas en F0. El principio de atleta es “registrar primero, interpretar después”.

No se ha creado ningún commit.
