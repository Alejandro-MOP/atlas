# ADR-001: Monorepo TypeScript

## Decisión

Usar pnpm workspaces para mobile, API y paquetes compartidos en un solo repositorio.

## Motivo

Permite compartir dominio y contratos con versionado coordinado, cambios atómicos y una experiencia de desarrollo sencilla. Turborepo se omite hasta que el tamaño del repositorio justifique su cache/orquestación.
