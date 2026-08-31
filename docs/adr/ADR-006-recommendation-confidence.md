# ADR-006: Recomendaciones explicables

El contrato `Recommendation<T>` incluye valor, confidence entre 0 y 1, razones y evidencia opcional. La confianza podrá disminuir según la cadena de evidencia: variante exacta, variante relacionada, ejercicio base o familia de movimiento. F0 sólo define el contrato; no implementa el algoritmo.
