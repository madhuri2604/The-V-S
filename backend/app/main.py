# backend/app/main.py

from fastapi import FastAPI
from app.routers import auth, vote, health  # Import all routers
from app.config import settings
import logging
print(settings.database_url)
app = FastAPI()

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(vote.router, tags=["Voting"])
app.include_router(health.router, tags=["Health"])

# Optional: root route
@app.get("/")
def read_root():
    return {"message": "Welcome to the Voting System API"}

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response
