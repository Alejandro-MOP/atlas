# ADR-002: Modular monolith

La API será un modular monolith: una aplicación Fastify, separada internamente por módulos y puertos. Evita el coste operativo de microservicios durante F0 y deja límites claros para extraer módulos sólo si el producto lo requiere.
