from fastapi import FastAPI, HTTPException

app = FastAPI(
    title="products-service",
    version="0.1.0",
    description="Products microservice for the DevOps Python Microservices Platform",
)

PRODUCTS = [
    {"id": 1, "name": "Adjustable Dumbbell", "price": 120.0, "currency": "USD"},
    {"id": 2, "name": "Training Mat", "price": 35.5, "currency": "USD"},
    {"id": 3, "name": "Resistance Bands", "price": 18.0, "currency": "USD"},
]


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "products-service"}


@app.get("/products")
def list_products():
    return {"items": PRODUCTS, "count": len(PRODUCTS)}


@app.get("/products/{product_id}")
def get_product(product_id: int):
    product = next((item for item in PRODUCTS if item["id"] == product_id), None)

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return product