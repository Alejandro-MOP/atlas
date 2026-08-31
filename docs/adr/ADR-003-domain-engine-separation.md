# ADR-003: Separación entre dominio y engines

El dominio contiene conceptos e invariantes puros. Los engines determinísticos se ubican en `engine-core` y sólo reciben datos/puertos explícitos. No dependen de React Native, HTTP, Drizzle o PostgreSQL; la API coordina casos de uso y adaptadores.
