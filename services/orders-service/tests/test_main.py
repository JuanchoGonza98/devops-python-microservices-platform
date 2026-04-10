from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "orders-service"
    assert data["app_env"] == "development"
    assert data["log_level"] == "INFO"


def test_list_orders():
    response = client.get("/orders")
    assert response.status_code == 200

    data = response.json()
    assert "items" in data
    assert "count" in data
    assert data["count"] >= 1


def test_get_order_by_id():
    response = client.get("/orders/1")
    assert response.status_code == 200

    data = response.json()
    assert data["id"] == 1
    assert data["user_id"] == 1


def test_get_order_not_found():
    response = client.get("/orders/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Order not found"


def test_create_order():
    payload = {
        "user_id": 2,
        "product_ids": [2, 3],
        "total_amount": 53.5,
        "currency": "USD",
        "status": "created",
    }

    response = client.post("/orders", json=payload)
    assert response.status_code == 201

    data = response.json()
    assert data["user_id"] == payload["user_id"]
    assert data["product_ids"] == payload["product_ids"]
    assert data["total_amount"] == payload["total_amount"]
    assert data["currency"] == payload["currency"]
    assert data["status"] == payload["status"]
    assert "id" in data
