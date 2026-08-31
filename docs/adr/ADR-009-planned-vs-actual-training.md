# ADR-009: Planned vs actual training

Separamos el plan del coach (`Mesocycle → TrainingWeek → WorkoutDay → ExercisePrescription → PrescriptionSet`) del desempeño futuro del atleta (`WorkoutSession → ExercisePerformance → SetLog`). La separación permite comparar intención y ejecución sin sobrescribir el plan y proporciona evidencia limpia para futuros engines de carga y análisis.
