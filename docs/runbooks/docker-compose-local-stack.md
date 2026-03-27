# Docker Compose Local Stack Runbook

## Objetivo

Levantar y validar localmente la plataforma completa usando Docker Compose.

## Archivo principal

```text
deploy/docker-compose/docker-compose.yml
Servicios incluidos
products-service
users-service
payments-service
orders-service
gateway
Requisitos

Antes de levantar el stack, asegúrate de tener instalado:

Docker
Docker Compose

También debes estar ubicado en la raíz del proyecto:

cd ~/DevOps-Project/devops-python-microservices-platform
Levantar el stack

Desde la raíz del proyecto:

make compose-up

O directamente:

cd deploy/docker-compose
docker compose up --build
Verificar contenedores en ejecución
make compose-ps

O directamente:

docker compose -f deploy/docker-compose/docker-compose.yml ps
Ver logs del stack
make compose-logs

O directamente:

docker compose -f deploy/docker-compose/docker-compose.yml logs -f
Probar el gateway
Con Makefile
make gateway-test
Manualmente con curl
curl http://127.0.0.1:8080/health
curl http://127.0.0.1:8080/products
curl http://127.0.0.1:8080/users
curl http://127.0.0.1:8080/payments
curl http://127.0.0.1:8080/orders
Respuestas esperadas
Health del gateway
{"status":"ok","service":"gateway"}
Products

Debe devolver una estructura similar a:

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
Users

Debe devolver una estructura similar a:

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
Payments

Debe devolver una estructura similar a:

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
Orders

Debe devolver una estructura similar a:

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
Detener el stack
make compose-down

O directamente:

docker compose -f deploy/docker-compose/docker-compose.yml down
Reconstruir imágenes
make compose-build

O directamente:

docker compose -f deploy/docker-compose/docker-compose.yml build
Troubleshooting básico
Ver si los contenedores están levantados
docker ps
Ver logs de un servicio específico

Ejemplo para gateway:

docker logs gateway

Ejemplo para products-service:

docker logs products-service
El gateway responde /health pero devuelve 502

Esto normalmente indica que uno o más microservicios internos no están disponibles o no están resolviendo correctamente dentro de la red de Docker Compose.

Pasos de verificación:

Confirmar que todos los contenedores están en ejecución.
Revisar logs del gateway.
Revisar logs del servicio afectado.
Reconstruir y volver a levantar el stack.

Comandos útiles:

make compose-ps
make compose-logs
make compose-down
make compose-up
Resultado esperado

La fase Docker Compose se considera validada cuando:

las imágenes construyen correctamente
Docker Compose levanta todo el stack
el gateway responde en 8080
el gateway enruta correctamente hacia los cuatro microservicios
el entorno local es reproducible con una sola definición
Estado de la fase

Esta fase queda cerrada formalmente cuando:

la documentación está actualizada
el Makefile incluye comandos útiles para operar el stack
el gateway fue validado a través de Docker Compose
el flujo local está listo para servir como base antes de pasar a Kubernetes