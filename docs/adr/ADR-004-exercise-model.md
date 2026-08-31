# ADR-004: Modelo Movement / Exercise / Variant

Los ejercicios no se modelan como strings aislados. La jerarquía futura será `Movement`, `Exercise`, `ExerciseVariant` y modificadores/contexto de ejecución. Esto permite relacionar variantes exactas, ejercicio base y familia de movimiento sin bloquear el catálogo futuro.
