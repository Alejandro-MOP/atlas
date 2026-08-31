# ATLAS Executive Report

## Executive Summary

ATLAS (Adaptive Training & Load Analysis System) es una plataforma de seguimiento y asistencia para fuerza, powerlifting e hipertrofia. Comienza como herramienta para un atleta, pero su arquitectura no está hardcodeada a una persona y puede crecer hacia un producto multiusuario.

## Product Vision

ATLAS conectará la planificación del coach con la ejecución real y, progresivamente, con carga, reps, RIR/RPE, variantes, historial, sueño, nutrición, cafeína, actividad, estrés, fatiga y equipamiento. **ATLAS no reemplaza la autorregulación del atleta; la cuantifica.**

## Problem

La intención del plan y la ejecución suelen vivir en notas, hojas de cálculo o memoria. ATLAS conserva ambas capas para comparar lo prescrito con lo realizado sin sobrescribir el dato original ni interpretar antes de tiempo.

## Product Principles

- Registrar primero. Interpretar después.
- Personalización mediante configuración y datos, no hardcode.
- Deterministic engines first, AI explanation later.
- Recommendations must be explainable.
- Confidence reflects evidence quality.
- Correlation does not imply causation.
- Mucha capacidad con poca fricción: automatic data > quick input > advanced optional input.

## High-Level Architecture

```mermaid
flowchart TD
  Mobile[ATLAS Mobile] --> API[ATLAS API]
  API --> Application[Application Layer]
  Application --> Domain[Domain]
  Application --> Engines[Deterministic Engines]
  Application --> Repositories[Repositories]
  Repositories --> PostgreSQL[(PostgreSQL)]
  Integrations[Apple Health / Siri / Apple Watch] -. futuro .-> Mobile
```

La API es un modular monolith. Domain y engine-core son puros y no dependen de React Native, Fastify, Drizzle o PostgreSQL; la infraestructura depende hacia adentro.

## Training Model

El plan prescrito actual es:

```text
Athlete
└── Mesocycle
    └── TrainingWeek
        └── WorkoutDay
            └── ExercisePrescription
                └── PrescriptionSet
```

Se relaciona con `Movement → Exercise → ExerciseVariant`, cuyos modifiers permiten flexibilidad estructurada. F1-001 implementó PLANNED y F1-002 añadió ACTUAL: `WorkoutSession → ExercisePerformance → SetLog`. Ambas capas pueden relacionarse cuando existe prescription, y las sesiones libres también son válidas.

## Data Strategy

Los futuros contextos MORNING, PRE_WORKOUT y END_OF_DAY se registrarán como observaciones. Históricos incompletos podrán conservar fuente, nivel de confianza, secuencia y fecha aproximada. La interpretación vendrá después.

## Recommendation Strategy

Los futuros engines producirán valor, confidence, razones y evidencia. La calidad de evidencia seguirá la jerarquía variante exacta → variante relacionada → ejercicio base → familia de movimiento.

## Personalization Strategy

Equipamiento, preferencias, perfiles de gimnasio y presets serán datos configurables. El atleta inicial es una configuración de despliegue, no una identidad codificada en el dominio.

## Apple Ecosystem Strategy

HealthKit, Apple Health, Apple Watch, App Intents y Siri son integraciones futuras desacopladas. No son capacidades actuales.

## Current Capabilities

El código actual ofrece monorepo pnpm TypeScript, app Expo Router mínima, API Fastify, PostgreSQL/Drizzle, modelos PLANNED y ACTUAL persistentes, catálogo, Zod runtime validation, validación relacional, seed, plan API, sesiones con performances/sets, completion, tests de integración y quality scripts.

No están implementados dashboards, engines de recomendación, nutrition UI, Apple Health, auth, Siri, Watch ni AI.

## Current Status

F0 está completa. F1 está en progreso: PLANNED y ACTUAL están disponibles; la experiencia mobile completa y los engines permanecen pendientes. Consulta el [ROADMAP](ROADMAP.md) para estados y delivery.

## Roadmap Summary

F0 Foundation → F1 Training Tracker → F2 Load Adjustment → F3 Athlete Context → F4 Nutrition & Caffeine → F5 Apple Health → F6 Historical Import → F7 Analytics → F8 Progression → F9 Pivot → F10 Readiness & Fatigue → F11 Powerlifting → F12 Siri & Apple Watch → F13 ATLAS Intelligence.

## Risks / Open Questions

- Momento adecuado para auth y aislamiento multiusuario.
- Utilidad y permisos de datos de Apple Health.
- Calibración de confidence con historiales incompletos.
- Evitar presentar asociaciones como causalidad.
- Mantener baja la fricción de captura.

## Next Milestone

F1-001A y F1-002 están cerrados. La siguiente milestone es F1-003 para la experiencia mobile de entrenamiento.
