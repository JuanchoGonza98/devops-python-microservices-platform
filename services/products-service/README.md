# products-service

A lightweight FastAPI microservice that exposes a product catalog as part of the DevOps Python Microservices Platform.

---

## Overview

| Property  | Value                  |
|-----------|------------------------|
| Framework | FastAPI                |
| Runtime   | Python 3.12            |
| Port      | `8001`                 |
| Version   | `0.1.0`                |

---

## Endpoints

### `GET /health`

Returns the health status of the service.

**Response**

```json
{
  "status": "ok",
  "service": "products-service"
}
```

---

### `GET /products`

Returns the full list of available products.

**Response**

```json
{
  "items": [
    { "id": 1, "name": "Adjustable Dumbbell", "price": 120.0, "currency": "USD" },
    { "id": 2, "name": "Training Mat",        "price": 35.5,  "currency": "USD" },
    { "id": 3, "name": "Resistance Bands",    "price": 18.0,  "currency": "USD" }
  ],
  "count": 3
}
```

---

### `GET /products/{product_id}`

Returns a single product by its ID.

**Path parameter**

| Parameter    | Type    | Required | Description        |
|--------------|---------|----------|--------------------|
| `product_id` | integer | Yes      | The product's ID   |

**Response — 200 OK**

```json
{
  "id": 1,
  "name": "Adjustable Dumbbell",
  "price": 120.0,
  "currency": "USD"
}
```

**Response — 404 Not Found**

```json
{
  "detail": "Product not found"
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
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

The service will be available at `http://localhost:8001`.

### Interactive API Docs

FastAPI provides auto-generated documentation out of the box:

| Interface  | URL                                  |
|------------|--------------------------------------|
| Swagger UI | `http://localhost:8001/docs`         |
| ReDoc      | `http://localhost:8001/redoc`        |

---

## Running Tests

```bash
pytest tests/
```

### Test Coverage

| Test                      | Description                              |
|---------------------------|------------------------------------------|
| `test_health_check`       | Verifies the health endpoint response    |
| `test_list_products`      | Verifies the product list structure      |
| `test_get_product_by_id`  | Verifies retrieval of a single product   |
| `test_get_product_not_found` | Verifies 404 on unknown product ID    |

---

## Docker

### Build the Image

```bash
docker build -t devops-products-service:local .
```

### Run the Container

```bash
docker run -p 8001:8001 devops-products-service:local
```

### Build Inside Minikube

If deploying to Minikube with the Docker driver, build within Minikube's daemon:

```bash
eval $(minikube docker-env)
docker build -t devops-products-service:local .
```

---

## Project Structure

```text
products-service/
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
