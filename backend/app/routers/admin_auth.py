from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database
from app.auth_utils import (
    hash_password,
    verify_password,
    create_admin_token,
    get_current_admin,
)

router = APIRouter(tags=["Admin Auth"])


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register-first", response_model=schemas.AdminTokenResponse)
def register_first_admin(payload: schemas.AdminRegisterRequest, db: Session = Depends(get_db)):
    # Only allowed if NO admin exists yet — one-time bootstrap.
    existing_count = db.query(models.Admin).count()
    if existing_count > 0:
        raise HTTPException(
            status_code=403,
            detail="An admin account already exists. This endpoint only works once.",
        )

    admin = models.Admin(
        email=payload.email.strip().lower(),
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)

    token = create_admin_token(admin.id)
    return schemas.AdminTokenResponse(
        access_token=token,
        admin_id=admin.id,
        admin_email=admin.email,
        admin_full_name=admin.full_name or "",
    )


@router.post("/login", response_model=schemas.AdminTokenResponse)
def admin_login(payload: schemas.AdminLoginRequest, db: Session = Depends(get_db)):
    admin = (
        db.query(models.Admin)
        .filter(models.Admin.email == payload.email.strip().lower())
        .first()
    )
    if not admin or not verify_password(payload.password, admin.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_admin_token(admin.id)
    return schemas.AdminTokenResponse(
        access_token=token,
        admin_id=admin.id,
        admin_email=admin.email,
        admin_full_name=admin.full_name or "",
    )


@router.get("/me", response_model=schemas.AdminOut)
def get_admin_me(current_admin: models.Admin = Depends(get_current_admin)):
    return current_admin