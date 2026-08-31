# ATLAS architecture overview

ATLAS usa dependencias dirigidas hacia dentro: presentación y adaptadores dependen de casos de uso/contratos; los engines y el dominio no dependen de HTTP, React Native, PostgreSQL ni frameworks. La API es un modular monolith con módulos separables por contexto cuando el producto crezca.

El atleta inicial no aparece en nombres, tipos ni reglas del core. La identidad de usuario, gimnasio/equipment profile y preferencias serán datos de configuración. El modelo futuro de ejercicio es `Movement → Exercise → ExerciseVariant → Modifiers / execution context`.

Los datos de contexto se registrarán en MORNING, PRE_WORKOUT y END_OF_DAY. La interpretación vendrá después y no se codifican reglas clínicas o arbitrarias en F0. CaffeineIntake es un evento temporal con fuente y método de estimación, no una propiedad del workout.

## Integraciones futuras

`Apple Watch → Apple Health / HealthKit → ATLAS mobile → ATLAS API`; posteriormente App Intents/Siri y Watch App. Estas integraciones se mantienen fuera de la foundation para evitar acoplamiento nativo prematuro.
