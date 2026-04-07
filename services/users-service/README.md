# users-service

A lightweight FastAPI microservice that handles user registration and lookup as part of the DevOps Python Microservices Platform.

---

## Overview

| Property  | Value                  |
|-----------|------------------------|
| Framework | FastAPI                |
| Runtime   | Python 3.12            |
| Port      | `8002`                 |
| Version   | `0.1.0`                |

---

## Endpoints

### `GET /health`

Returns the health status of the service.

**Response**

```json
{
  "status": "ok",
  "service": "users-service"
}
```

---

### `GET /users`

Returns the full list of registered users.

**Response**

```json
{
  "items": [
    { "id": 1, "name": "Juan Perez",   "email": "juan.perez@example.com"  },
    { "id": 2, "name": "Maria Lopez",  "email": "maria.lopez@example.com" }
  ],
  "count": 2
}
```

---

### `GET /users/{user_id}`

Returns a single user by their ID.

**Path parameter**

| Parameter | Type    | Required | Description    |
|-----------|---------|----------|----------------|
| `user_id` | integer | Yes      | The user's ID  |

**Response — 200 OK**

```json
{
  "id": 1,
  "name": "Juan Perez",
  "email": "juan.perez@example.com"
}
```

**Response — 404 Not Found**

```json
{
  "detail": "User not found"
}
```

---

### `POST /users`

Creates a new user. The `email` field is validated using Pydantic's `EmailStr`.

**Request body**

```json
{
  "name": "Carlos Gomez",
  "email": "carlos.gomez@example.com"
}
```

| Field   | Type   | Required | Validation          |
|---------|--------|----------|---------------------|
| `name`  | string | Yes      | Non-empty string    |
| `email` | string | Yes      | Valid email address |

**Response — 201 Created**

```json
{
  "id": 3,
  "name": "Carlos Gomez",
  "email": "carlos.gomez@example.com"
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
uvicorn app.main:app --host 0.0.0.0 --port 8002 --reload
```

The service will be available at `http://localhost:8002`.

### Interactive API Docs

| Interface  | URL                               |
|------------|-----------------------------------|
| Swagger UI | `http://localhost:8002/docs`      |
| ReDoc      | `http://localhost:8002/redoc`     |

---

## Running Tests

```bash
pytest tests/
```

### Test Coverage

| Test                    | Description                              |
|-------------------------|------------------------------------------|
| `test_health_check`     | Verifies the health endpoint response    |
| `test_list_users`       | Verifies the user list structure         |
| `test_get_user_by_id`   | Verifies retrieval of a single user      |
| `test_get_user_not_found` | Verifies 404 on unknown user ID        |
| `test_create_user`      | Verifies user creation and response body |

---

## Docker

### Build the Image

```bash
docker build -t devops-users-service:local .
```

### Run the Container

```bash
docker run -p 8002:8002 devops-users-service:local
```

### Build Inside Minikube

```bash
eval $(minikube docker-env)
docker build -t devops-users-service:local .
```

---

## Project Structure

```text
users-service/
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
