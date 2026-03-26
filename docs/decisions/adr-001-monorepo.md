# ADR-001: Monorepo como estrategia inicial

## Estado
Aceptado

## Contexto

El proyecto está compuesto por múltiples servicios, pero se encuentra en una etapa inicial donde la velocidad, consistencia y simplicidad son prioritarias.

## Decisión

Se utilizará un monorepo para contener:

- microservicios
- frontend
- gateway
- manifiestos de despliegue
- documentación
- automatizaciones

## Justificación

Se elige monorepo porque:

- simplifica el arranque
- reduce complejidad prematura
- facilita mantener coherencia entre servicios
- mejora la visibilidad del proyecto completo
- es apropiado para un proyecto de portfolio end to end

## Consecuencias

### Positivas
- estructura centralizada
- documentación unificada
- menor fricción al comienzo
- más fácil de explicar y mantener en la etapa inicial

### Negativas
- mayor volumen en un solo repositorio
- posible necesidad futura de separar responsabilidades

## Revisión futura

Más adelante podrá evaluarse separar el repositorio GitOps o algunos componentes si la complejidad lo justifica.
