from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database
from app.auth_utils import get_current_admin

router = APIRouter(prefix="/universities", tags=["Universities"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.University)
def create_university(
    university: schemas.UniversityCreate,
    db: Session = Depends(get_db),
    admin: models.Admin = Depends(get_current_admin)
):
    db_university = models.University(**university.dict())
    db.add(db_university)
    db.commit()
    db.refresh(db_university)
    return db_university

@router.get("/", response_model=list[schemas.University])
def get_universities(db: Session = Depends(get_db)):
    return db.query(models.University).all()

@router.get("/{university_id}", response_model=schemas.University)
def get_university(university_id: int, db: Session = Depends(get_db)):
    uni = db.query(models.University).filter(models.University.id == university_id).first()
    if not uni:
        raise HTTPException(status_code=404, detail="University not found")
    return uni

@router.put("/{university_id}", response_model=schemas.University)
def update_university(
    university_id: int,
    university: schemas.UniversityCreate,
    db: Session = Depends(get_db),
    admin: models.Admin = Depends(get_current_admin)
):
    db_uni = db.query(models.University).filter(models.University.id == university_id).first()
    if not db_uni:
        raise HTTPException(status_code=404, detail="University not found")
    for key, value in university.dict().items():
        setattr(db_uni, key, value)
    db.commit()
    db.refresh(db_uni)
    return db_uni

@router.delete("/{university_id}")
def delete_university(
    university_id: int,
    db: Session = Depends(get_db),
    admin: models.Admin = Depends(get_current_admin)
):
    db_uni = db.query(models.University).filter(models.University.id == university_id).first()
    if not db_uni:
        raise HTTPException(status_code=404, detail="University not found")
    db.delete(db_uni)
    db.commit()
    return {"message": "University deleted successfully"}