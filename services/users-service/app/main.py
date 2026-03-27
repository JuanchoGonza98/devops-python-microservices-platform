from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr

app = FastAPI(
    title="users-service",
    version="0.1.0",
    description="Users microservice for the DevOps Python Microservices Platform",
)


class UserCreate(BaseModel):
    name: str
    email: EmailStr


USERS = [
    {"id": 1, "name": "Juan Perez", "email": "juan.perez@example.com"},
    {"id": 2, "name": "Maria Lopez", "email": "maria.lopez@example.com"},
]


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "users-service"}


@app.get("/users")
def list_users():
    return {"items": USERS, "count": len(USERS)}


@app.get("/users/{user_id}")
def get_user(user_id: int):
    user = next((item for item in USERS if item["id"] == user_id), None)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@app.post("/users", status_code=201)
def create_user(payload: UserCreate):
    new_id = max(user["id"] for user in USERS) + 1 if USERS else 1
    new_user = {
        "id": new_id,
        "name": payload.name,
        "email": payload.email,
    }
    USERS.append(new_user)
    return new_user