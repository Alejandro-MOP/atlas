# Training model: planned vs actual

F1 implementa únicamente el plan prescrito. Un plan empieza en un `Athlete`, contiene `Mesocycle`, `TrainingWeek`, `WorkoutDay` y `ExercisePrescription`; cada prescription contiene `PrescriptionSet` estructurados.

```mermaid
flowchart TD
  A[Athlete] --> M[Mesocycle]
  M --> W[TrainingWeek]
  W --> D[WorkoutDay]
  D --> P[ExercisePrescription]
  P --> S[PrescriptionSet]
  P --> E[Exercise]
  E --> MV[Movement]
  E --> V[ExerciseVariant]
  P -. futuro .-> WS[WorkoutSession]
  WS -. futuro .-> SL[SetLog]
```

`ExerciseVariant.modifiers` es JSON estructurado para conservar flexibilidad (`tempo`, pausas, postura, etc.). No se modelan sesiones realizadas ni logs en F1. Más adelante `WorkoutSession → ExercisePerformance → SetLog` se comparará con el plan para alimentar engines, sin mezclar prescripción con desempeño.
