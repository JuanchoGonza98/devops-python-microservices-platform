from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "users-service"
    assert data["app_env"] == "development"
    assert data["log_level"] == "INFO"


def test_list_users():
    response = client.get("/users")
    assert response.status_code == 200

    data = response.json()
    assert "items" in data
    assert "count" in data
    assert data["count"] >= 2


def test_get_user_by_id():
    response = client.get("/users/1")
    assert response.status_code == 200

    data = response.json()
    assert data["id"] == 1
    assert data["name"] == "Juan Perez"


def test_get_user_not_found():
    response = client.get("/users/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "User not found"


def test_create_user():
    payload = {
        "name": "Carlos Gomez",
        "email": "carlos.gomez@example.com",
    }

    response = client.post("/users", json=payload)
    assert response.status_code == 201

    data = response.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert "id" in data