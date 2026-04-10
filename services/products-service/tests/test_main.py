from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "products-service"
    assert data["app_env"] == "development"
    assert data["log_level"] == "INFO"


def test_list_products():
    response = client.get("/products")
    assert response.status_code == 200

    data = response.json()
    assert "items" in data
    assert "count" in data
    assert data["count"] == 3


def test_get_product_by_id():
    response = client.get("/products/1")
    assert response.status_code == 200

    data = response.json()
    assert data["id"] == 1
    assert data["name"] == "Adjustable Dumbbell"


def test_get_product_not_found():
    response = client.get("/products/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Product not found"