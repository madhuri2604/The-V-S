from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(tags=["Authentication"])

# Define input schema
class LoginRequest(BaseModel):
    username: str
    password: str

# Dummy user data
fake_users = {
    "admin": {"password": "admin123", "role": "admin"},
    "john": {"password": "john123", "role": "employee"},
}

@router.post("/login")
def login(payload: LoginRequest):
    user = fake_users.get(payload.username)
    if not user or user["password"] != payload.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "role": user["role"]}
