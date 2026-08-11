from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.routers import (
    student,
    universities,
    services,
    appointments,
    auth,
    admin_auth,
)

from app.database import (
    Base,
    engine,
    SessionLocal,
)

from app import models

# Create database tables
Base.metadata.create_all(bind=engine)

tags_metadata = [
    {"name": "Students", "description": "Operations with students"},
    {"name": "Universities", "description": "Operations with universities"},
    {"name": "Services", "description": "Operations with services"},
    {"name": "Appointments", "description": "Operations with appointments"},
    {"name": "Health", "description": "Health check endpoints"},
    {"name": "Auth", "description": "Student login (Google + OTP)"},
    {"name": "Admin Auth", "description": "Admin login and account management"},
]

app = FastAPI(
    title="UpBrainiacs Backend",
    version="1.2.0",
    description="Backend API for managing students, universities, services and appointments",
    openapi_tags=tags_metadata,
)

# For development
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/", tags=["Health"])
def root():
    return {
        "status": "success",
        "message": "UpBrainiacs API is running 🚀"
    }


@app.get("/health/db", tags=["Health"])
def health_db(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {
            "status": "Database connected ✅"
        }
    except Exception as e:
        return {
            "status": "Database error ❌",
            "detail": str(e)
        }


@app.exception_handler(Exception)
async def global_exception_handler(
    request: Request,
    exc: Exception
):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error"
        },
    )


@app.on_event("startup")
async def startup_event():
    print("🚀 UpBrainiacs Backend Started")


@app.on_event("shutdown")
async def shutdown_event():
    print("🛑 UpBrainiacs Backend Stopped")


app.include_router(
    student.router,
    prefix="/students",
    tags=["Students"]
)

app.include_router(
    universities.router,
    tags=["Universities"]
)

app.include_router(
    services.router,
    tags=["Services"]
)

app.include_router(
    appointments.router,
    tags=["Appointments"]
)

app.include_router(
    auth.router,
    prefix="/auth",
    tags=["Auth"]
)

app.include_router(
    admin_auth.router,
    prefix="/admin/auth",
    tags=["Admin Auth"]
)