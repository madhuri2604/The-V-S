# backend/app/main.py

from fastapi import FastAPI, Request
from app.routers import auth, vote, health
from app.config import settings
import logging
import os
import psutil
import platform
from fastapi.responses import Response
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST, Counter, Gauge
from fastapi.responses import PlainTextResponse

print(settings.database_url)
app = FastAPI()

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(vote.router, tags=["Voting"])
app.include_router(health.router, tags=["Health"])

# Prometheus Metrics
REQUEST_COUNT = Counter("http_requests_total", "Total HTTP requests")
CPU_PERCENT = Gauge("app_cpu_percent", "CPU usage percent")
MEMORY_PERCENT = Gauge("app_memory_percent", "Memory usage percent")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Voting System API"}

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    REQUEST_COUNT.inc()
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response

@app.get("/metrics", response_class=PlainTextResponse)
def get_metrics():
    cpu_percent = psutil.cpu_percent()
    mem_percent = psutil.virtual_memory().percent
    pid = os.getpid()
    return f"""
# HELP cpu_percent CPU utilization percentage.
# TYPE cpu_percent gauge
cpu_percent {cpu_percent}

# HELP memory_percent Memory utilization percentage.
# TYPE memory_percent gauge
memory_percent {mem_percent}

# HELP process_id PID of the running process.
# TYPE process_id gauge
process_id {pid}
"""

@app.get("/ready")
def readiness_check():
    # Add logic if needed to check DB or other dependencies
    return {"status": "ready"}
