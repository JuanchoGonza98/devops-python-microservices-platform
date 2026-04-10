import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List

app = FastAPI(
    title="orders-service",
    version="0.1.0",
    description="Orders microservice for the DevOps Python Microservices Platform",
)

APP_ENV = os.getenv("APP_ENV", "development")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
SERVICE_NAME = os.getenv("SERVICE_NAME", "orders-service")

class OrderCreate(BaseModel):
    user_id: int = Field(..., gt=0)
    product_ids: List[int] = Field(..., min_length=1)
    total_amount: float = Field(..., gt=0)
    currency: str
    status: str = "created"


ORDERS = [
    {
        "id": 1,
        "user_id": 1,
        "product_ids": [1, 2],
        "total_amount": 155.5,
        "currency": "USD",
        "status": "created",
    }
]


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": SERVICE_NAME,
        "app_env": APP_ENV,
        "log_level": LOG_LEVEL,
    }

@app.get("/orders")
def list_orders():
    return {"items": ORDERS, "count": len(ORDERS)}


@app.get("/orders/{order_id}")
def get_order(order_id: int):
    order = next((item for item in ORDERS if item["id"] == order_id), None)

    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")

    return order


@app.post("/orders", status_code=201)
def create_order(payload: OrderCreate):
    new_id = max(item["id"] for item in ORDERS) + 1 if ORDERS else 1
    new_order = {
        "id": new_id,
        "user_id": payload.user_id,
        "product_ids": payload.product_ids,
        "total_amount": payload.total_amount,
        "currency": payload.currency,
        "status": payload.status,
    }
    ORDERS.append(new_order)
    return new_order