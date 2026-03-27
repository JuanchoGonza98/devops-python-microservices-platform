# gateway

Gateway basado en Nginx que actúa como punto único de entrada para los microservicios de la plataforma.

## Rol del componente

Este gateway expone un único punto de acceso HTTP y enruta las solicitudes hacia los servicios internos:

- `products-service`
- `users-service`
- `payments-service`
- `orders-service`

## Rutas disponibles

- `GET /health`
- `GET /products`
- `GET /products/{product_id}`
- `GET /users`
- `GET /users/{user_id}`
- `POST /users`
- `GET /payments`
- `GET /payments/{payment_id}`
- `POST /payments`
- `GET /orders`
- `GET /orders/{order_id}`
- `POST /orders`

## Ejecución recomendada

La forma recomendada de ejecutar el gateway es como parte del stack completo con Docker Compose.

### Levantar todo el stack

Desde `deploy/docker-compose`:

```bash
docker compose up --build

