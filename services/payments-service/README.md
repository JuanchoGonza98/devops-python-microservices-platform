# payments-service

A lightweight FastAPI microservice that simulates payment processing as part of the DevOps Python Microservices Platform.

---

## Overview

| Property  | Value                  |
|-----------|------------------------|
| Framework | FastAPI                |
| Runtime   | Python 3.12            |
| Port      | `8003`                 |
| Version   | `0.1.0`                |

---

## Endpoints

### `GET /health`

Returns the health status of the service.

**Response**

```json
{
  "status": "ok",
  "service": "payments-service"
}
```

---

### `GET /payments`

Returns the full list of recorded payments.

**Response**

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

---

### `GET /payments/{payment_id}`

Returns a single payment by its ID.

**Path parameter**

| Parameter    | Type    | Required | Description       |
|--------------|---------|----------|-------------------|
| `payment_id` | integer | Yes      | The payment's ID  |

**Response — 200 OK**

```json
{
  "id": 1,
  "order_id": 101,
  "amount": 120.0,
  "currency": "USD",
  "method": "credit_card",
  "status": "approved"
}
```

**Response — 404 Not Found**

```json
{
  "detail": "Payment not found"
}
```

---

### `POST /payments`

Creates a new payment. All payments are automatically approved in this simulation.

**Request body**

```json
{
  "order_id": 102,
  "amount": 35.5,
  "currency": "USD",
  "method": "debit_card"
}
```

| Field      | Type    | Required | Validation     |
|------------|---------|----------|----------------|
| `order_id` | integer | Yes      | Must be `> 0`  |
| `amount`   | float   | Yes      | Must be `> 0`  |
| `currency` | string  | Yes      | —              |
| `method`   | string  | Yes      | —              |

**Response — 201 Created**

```json
{
  "id": 2,
  "order_id": 102,
  "amount": 35.5,
  "currency": "USD",
  "method": "debit_card",
  "status": "approved"
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
uvicorn app.main:app --host 0.0.0.0 --port 8003 --reload
```

The service will be available at `http://localhost:8003`.

### Interactive API Docs

| Interface  | URL                               |
|------------|-----------------------------------|
| Swagger UI | `http://localhost:8003/docs`      |
| ReDoc      | `http://localhost:8003/redoc`     |

---

## Running Tests

```bash
pytest tests/
```

### Test Coverage

| Test                         | Description                                   |
|------------------------------|-----------------------------------------------|
| `test_health_check`          | Verifies the health endpoint response         |
| `test_list_payments`         | Verifies the payment list structure           |
| `test_get_payment_by_id`     | Verifies retrieval of a single payment        |
| `test_get_payment_not_found` | Verifies 404 on unknown payment ID            |
| `test_create_payment`        | Verifies payment creation and response body   |

---

## Docker

### Build the Image

```bash
docker build -t devops-payments-service:local .
```

### Run the Container

```bash
docker run -p 8003:8003 devops-payments-service:local
```

### Build Inside Minikube

```bash
eval $(minikube docker-env)
docker build -t devops-payments-service:local .
```

---

## Project Structure

```text
payments-service/
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
