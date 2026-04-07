# Docker Compose — Local Stack Runbook

## Objetivo

Levantar y validar localmente la plataforma completa usando Docker Compose.

---

## Archivo Principal

```text
deploy/docker-compose/docker-compose.yml
```

---

## Servicios Incluidos

- `products-service`
- `users-service`
- `payments-service`
- `orders-service`
- `gateway`

---

## Requisitos

Antes de levantar el stack, asegúrate de tener instalado:

- Docker
- Docker Compose

También debes estar ubicado en la raíz del proyecto:

```bash
cd ~/DevOps-Project/devops-python-microservices-platform
```

---

## Levantar el Stack

Desde la raíz del proyecto:

```bash
make compose-up
```

O directamente:

```bash
cd deploy/docker-compose
docker compose up --build
```

---

## Verificar Contenedores en Ejecución

```bash
make compose-ps
```

O directamente:

```bash
docker compose -f deploy/docker-compose/docker-compose.yml ps
```

---

## Ver Logs del Stack

```bash
make compose-logs
```

O directamente:

```bash
docker compose -f deploy/docker-compose/docker-compose.yml logs -f
```

---

## Probar el Gateway

### Con Makefile

```bash
make gateway-test
```

### Manualmente con `curl`

```bash
curl http://127.0.0.1:8080/health
curl http://127.0.0.1:8080/products
curl http://127.0.0.1:8080/users
curl http://127.0.0.1:8080/payments
curl http://127.0.0.1:8080/orders
```

---

## Respuestas Esperadas

### Health del Gateway

```json
{"status": "ok", "service": "gateway"}
```

### Products

```json
{
  "items": [
    {
      "id": 1,
      "name": "Adjustable Dumbbell",
      "price": 120.0,
      "currency": "USD"
    }
  ],
  "count": 3
}
```

### Users

```json
{
  "items": [
    {
      "id": 1,
      "name": "Juan Perez",
      "email": "juan.perez@example.com"
    }
  ],
  "count": 2
}
```

### Payments

```json
{
  "items": [
    {
      "id": 1,
      "order_id": 101,
      "amount": 120.0,
      "currency": "USD",
      "method": "credit_card",
      "status": "approved"
    }
  ],
  "count": 1
}
```

### Orders

```json
{
  "items": [
    {
      "id": 1,
      "user_id": 1,
      "product_ids": [1, 2],
      "total_amount": 155.5,
      "currency": "USD",
      "status": "created"
    }
  ],
  "count": 1
}
```

---

## Detener el Stack

```bash
make compose-down
```

O directamente:

```bash
docker compose -f deploy/docker-compose/docker-compose.yml down
```

---

## Reconstruir Imágenes

```bash
make compose-build
```

O directamente:

```bash
docker compose -f deploy/docker-compose/docker-compose.yml build
```

---

## Troubleshooting

### Ver si los contenedores están levantados

```bash
docker ps
```

### Ver logs de un servicio específico

```bash
docker logs gateway
docker logs products-service
```

### El gateway responde `/health` pero devuelve `502`

Esto normalmente indica que uno o más microservicios internos no están disponibles o no están resolviendo correctamente dentro de la red de Docker Compose.

**Pasos de verificación:**

1. Confirmar que todos los contenedores están en ejecución.
2. Revisar logs del gateway.
3. Revisar logs del servicio afectado.
4. Reconstruir y volver a levantar el stack.

```bash
make compose-ps
make compose-logs
make compose-down
make compose-up
```

---

## Resultado Esperado

La fase Docker Compose se considera validada cuando:

- Las imágenes construyen correctamente.
- Docker Compose levanta todo el stack.
- El gateway responde en el puerto `8080`.
- El gateway enruta correctamente hacia los cuatro microservicios.
- El entorno local es reproducible con una sola definición.

---

## Estado de la Fase

Esta fase queda cerrada formalmente cuando:

- La documentación está actualizada.
- El Makefile incluye comandos útiles para operar el stack.
- El gateway fue validado a través de Docker Compose.
- El flujo local está listo para servir como base antes de pasar a Kubernetes.
