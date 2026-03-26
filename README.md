# DevOps Python Microservices Platform

Plataforma de ecommerce basada en microservicios desarrollados en Python, diseñada para demostrar un flujo DevOps end to end con prácticas modernas de ingeniería de software.

## Objetivo

Este proyecto busca servir como portfolio profesional para demostrar capacidades en:

- desarrollo backend con Python
- diseño de microservicios
- contenedorización con Docker
- despliegue en Kubernetes
- GitOps con Argo CD
- infraestructura como código con Terraform
- despliegue en AWS
- documentación y trazabilidad técnica

## Alcance funcional inicial

La primera versión incluirá:

- registro y consulta básica de usuarios
- catálogo de productos
- creación y consulta de órdenes
- simulación de pagos
- frontend ligero
- gateway de entrada

## Arquitectura inicial

Servicios contemplados:

- `users-service`
- `products-service`
- `orders-service`
- `payments-service`
- `frontend`
- `gateway`

## Estructura del repositorio

```text
services/      # microservicios backend
frontend/      # interfaz web
gateway/       # punto de entrada
deploy/        # docker compose, kubernetes y terraform
docs/          # arquitectura, decisiones, runbooks y portfolio
scripts/       # automatizaciones auxiliares
.github/       # workflows CI

Roadmap
Base profesional del proyecto
Diseño funcional y técnico
Desarrollo local
Docker Compose
Kubernetes
CI
GitOps con Argo CD
Terraform
AWS
Mejoras productivas
Estado actual

En progreso: inicialización de estructura base y documentación.

Principios del proyecto
simplicidad con criterio
documentación desde el inicio
cambios pequeños y trazables
foco en calidad y reproducibilidad
orientación real a portfolio profesional


---

## 4) Contenido de `docs/architecture/overview.md`

```md
# Architecture Overview

## Visión general

Este proyecto implementa una pequeña plataforma de ecommerce basada en microservicios en Python.

El objetivo no es construir un sistema grande, sino uno suficientemente serio para demostrar:

- separación de responsabilidades
- comunicación entre servicios
- empaquetado y despliegue moderno
- operación sobre Kubernetes
- prácticas GitOps
- infraestructura reproducible

## Componentes iniciales

### users-service
Gestiona registro y consulta básica de usuarios.

### products-service
Expone el catálogo de productos.

### orders-service
Permite crear y consultar órdenes.

### payments-service
Simula el procesamiento de pagos.

### frontend
Interfaz ligera para consumir la plataforma.

### gateway
Punto de entrada para enrutar el tráfico hacia los servicios internos.

## Flujo lógico inicial

1. El usuario interactúa con el frontend.
2. El frontend consume el gateway.
3. El gateway enruta solicitudes al servicio correspondiente.
4. Los servicios responden según su responsabilidad.
5. `orders-service` podrá interactuar con otros servicios según necesidad funcional.

## Objetivo de despliegue

El proyecto evolucionará en este orden:

- ejecución local
- Docker Compose
- Kubernetes
- GitOps con Argo CD
- despliegue cloud con Terraform y AWS
