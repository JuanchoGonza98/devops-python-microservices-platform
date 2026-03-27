# gateway

Gateway basado en Nginx que actúa como punto único de entrada para los microservicios.

## Rutas expuestas

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

## Desarrollo local

Este gateway espera que los microservicios estén corriendo localmente en:

- `products-service` → `127.0.0.1:8001`
- `users-service` → `127.0.0.1:8002`
- `payments-service` → `127.0.0.1:8003`
- `orders-service` → `127.0.0.1:8004`

## Build de imagen

```bash
docker build -t devops-gateway:local -f gateway/Dockerfile gateway