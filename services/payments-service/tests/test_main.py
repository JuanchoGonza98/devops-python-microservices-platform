from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "payments-service",
    }


def test_list_payments():
    response = client.get("/payments")
    assert response.status_code == 200

    data = response.json()
    assert "items" in data
    assert "count" in data
    assert data["count"] >= 1


def test_get_payment_by_id():
    response = client.get("/payments/1")
    assert response.status_code == 200

    data = response.json()
    assert data["id"] == 1
    assert data["status"] == "approved"


def test_get_payment_not_found():
    response = client.get("/payments/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Payment not found"


def test_create_payment():
    payload = {
        "order_id": 102,
        "amount": 35.5,
        "currency": "USD",
        "method": "debit_card",
    }

    response = client.post("/payments", json=payload)
    assert response.status_code == 201

    data = response.json()
    assert data["order_id"] == payload["order_id"]
    assert data["amount"] == payload["amount"]
    assert data["currency"] == payload["currency"]
    assert data["method"] == payload["method"]
    assert data["status"] == "approved"
    assert "id" in data