# ADR-010: Runtime validation with Zod

Los contratos de entrada HTTP se validan con Zod en `packages/contracts`. Así mobile y API comparten forma e invariantes de entrada, mientras que Drizzle permanece encapsulado en API. Las entidades de dominio mantienen validaciones ligeras independientes de Zod.
