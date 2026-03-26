# ADR-002: GitOps con Argo CD como estrategia de CD

## Estado
Aceptado

## Contexto

El proyecto será desplegado sobre Kubernetes y busca alinearse con prácticas modernas de operación y entrega continua.

## Decisión

La estrategia de CD se basará en GitOps usando Argo CD.

La tubería de CI será responsable de:

- validar código
- ejecutar tests
- construir imágenes
- publicar imágenes en registry

Argo CD será responsable de:

- observar el estado declarado en Git
- detectar diferencias con el clúster
- sincronizar el estado deseado

## Justificación

Se elige GitOps con Argo CD porque:

- mejora la trazabilidad
- convierte a Git en la fuente de verdad
- reduce despliegues imperativos manuales
- facilita rollback
- es altamente valioso para un portfolio DevOps/Platform/SRE

## Consecuencias

### Positivas
- mayor claridad operacional
- mejor control del estado deseado
- flujo moderno y profesional

### Negativas
- agrega una capa conceptual adicional
- requiere disciplina en la gestión de manifests y entornos

## Flujo objetivo

1. cambio en código
2. CI valida y construye imagen
3. se actualizan manifests GitOps
4. Argo CD sincroniza el clúster
