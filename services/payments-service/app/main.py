import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(
    title="payments-service",
    version="0.1.0",
    description="Payments microservice for the DevOps Python Microservices Platform",
)

APP_ENV = os.getenv("APP_ENV", "development")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
SERVICE_NAME = os.getenv("SERVICE_NAME", "unknown-service")

class PaymentCreate(BaseModel):
    order_id: int = Field(..., gt=0)
    amount: float = Field(..., gt=0)
    currency: str
    method: str


PAYMENTS = [
    {
        "id": 1,
        "order_id": 101,
        "amount": 120.0,
        "currency": "USD",
        "method": "credit_card",
        "status": "approved",
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

@app.get("/payments")
def list_payments():
    return {"items": PAYMENTS, "count": len(PAYMENTS)}


@app.get("/payments/{payment_id}")
def get_payment(payment_id: int):
    payment = next((item for item in PAYMENTS if item["id"] == payment_id), None)

    if payment is None:
        raise HTTPException(status_code=404, detail="Payment not found")

    return payment


@app.post("/payments", status_code=201)
def create_payment(payload: PaymentCreate):
    new_id = max(item["id"] for item in PAYMENTS) + 1 if PAYMENTS else 1
    new_payment = {
        "id": new_id,
        "order_id": payload.order_id,
        "amount": payload.amount,
        "currency": payload.currency,
        "method": payload.method,
        "status": "approved",
    }
    PAYMENTS.append(new_payment)
    return new_payment