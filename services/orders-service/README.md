# orders-service

A lightweight FastAPI microservice that handles order creation and consultation as part of the DevOps Python Microservices Platform.

---

## Overview

| Property  | Value                  |
|-----------|------------------------|
| Framework | FastAPI                |
| Runtime   | Python 3.12            |
| Port      | `8004`                 |
| Version   | `0.1.0`                |

---

## Endpoints

### `GET /health`

Returns the health status of the service.

**Response**

```json
{
  "status": "ok",
  "service": "orders-service"
}
```

---

### `GET /orders`

Returns the full list of recorded orders.

**Response**

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

### `GET /orders/{order_id}`

Returns a single order by its ID.

**Path parameter**

| Parameter  | Type    | Required | Description      |
|------------|---------|----------|------------------|
| `order_id` | integer | Yes      | The order's ID   |

**Response — 200 OK**

```json
{
  "id": 1,
  "user_id": 1,
  "product_ids": [1, 2],
  "total_amount": 155.5,
  "currency": "USD",
  "status": "created"
}
```

**Response — 404 Not Found**

```json
{
  "detail": "Order not found"
}
```

---

### `POST /orders`

Creates a new order.

**Request body**

```json
{
  "user_id": 2,
  "product_ids": [2, 3],
  "total_amount": 53.5,
  "currency": "USD",
  "status": "created"
}
```

| Field          | Type             | Required | Validation                  |
|----------------|------------------|----------|-----------------------------|
| `user_id`      | integer          | Yes      | Must be `> 0`               |
| `product_ids`  | array of integers| Yes      | At least one product ID     |
| `total_amount` | float            | Yes      | Must be `> 0`               |
| `currency`     | string           | Yes      | —                           |
| `status`       | string           | No       | Defaults to `"created"`     |

**Response — 201 Created**

```json
{
  "id": 2,
  "user_id": 2,
  "product_ids": [2, 3],
  "total_amount": 53.5,
  "currency": "USD",
  "status": "created"
}
```

---

## Local Development

### Prerequisites

- Python 3.12+

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run the Service

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8004 --reload
```

The service will be available at `http://localhost:8004`.

### Interactive API Docs

| Interface  | URL                               |
|------------|-----------------------------------|
| Swagger UI | `http://localhost:8004/docs`      |
| ReDoc      | `http://localhost:8004/redoc`     |

---

## Running Tests

```bash
pytest tests/
```

### Test Coverage

| Test                       | Description                                 |
|----------------------------|---------------------------------------------|
| `test_health_check`        | Verifies the health endpoint response       |
| `test_list_orders`         | Verifies the order list structure           |
| `test_get_order_by_id`     | Verifies retrieval of a single order        |
| `test_get_order_not_found` | Verifies 404 on unknown order ID            |
| `test_create_order`        | Verifies order creation and response body   |

---

## Docker

### Build the Image

```bash
docker build -t devops-orders-service:local .
```

### Run the Container

```bash
docker run -p 8004:8004 devops-orders-service:local
```

### Build Inside Minikube

```bash
eval $(minikube docker-env)
docker build -t devops-orders-service:local .
```

---

## Project Structure

```text
orders-service/
├── app/
│   ├── __init__.py
│   └── main.py          # FastAPI application and route definitions
├── tests/
│   ├── conftest.py      # Pytest path configuration
│   └── test_main.py     # Endpoint tests
├── Dockerfile
├── requirements.txt
└── README.md
```
