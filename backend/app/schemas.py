from pydantic import BaseModel
from datetime import datetime

# -------------------------
# Student Schemas (inquiry/lead form)
# -------------------------

class StudentBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    mobile: str
    degree_pref: str
    country_pref: str
    expected_neet_score: str


class StudentCreate(StudentBase):
    pass


class Student(StudentBase):
    id: int

    class Config:
        from_attributes = True


# -------------------------
# University Schemas
# -------------------------

class UniversityBase(BaseModel):
    name: str
    image_url: str = ""
    description: str = ""
    established: str = ""
    university_type: str = ""
    location: str = ""
    country: str
    duration: str = ""
    medium: str = ""
    recognition: str = ""
    degree_type: str
    mbbs_seats: str = ""
    fees: str
    scholarships: str

class UniversityCreate(UniversityBase):
    pass


class University(UniversityBase):
    id: int

    class Config:
        from_attributes = True


# -------------------------
# Service Schemas
# -------------------------

class ServiceBase(BaseModel):
    name: str
    description: str


class ServiceCreate(ServiceBase):
    pass


class Service(ServiceBase):
    id: int

    class Config:
        from_attributes = True


# -------------------------
# Appointment Schemas
# -------------------------

class AppointmentBase(BaseModel):
    student_id: int
    date: datetime
    notes: str


class AppointmentCreate(AppointmentBase):
    pass


class Appointment(AppointmentBase):
    id: int

    class Config:
        from_attributes = True


# -------------------------
# Auth Schemas (Student login accounts)
# -------------------------

class StudentAccountOut(BaseModel):
    id: int
    email: str
    full_name: str = ""
    profile_picture: str = ""

    class Config:
        from_attributes = True


class GoogleLoginRequest(BaseModel):
    credential: str


class OTPRequest(BaseModel):
    email: str


class OTPVerify(BaseModel):
    email: str
    otp: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    student_id: int
    student_email: str
    student_full_name: str = ""
    student_profile_picture: str = ""


# -------------------------
# Admin Schemas
# -------------------------

class AdminLoginRequest(BaseModel):
    email: str
    password: str


class AdminRegisterRequest(BaseModel):
    email: str
    password: str
    full_name: str = ""


class AdminTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    admin_id: int
    admin_email: str
    admin_full_name: str = ""


class AdminOut(BaseModel):
    id: int
    email: str
    full_name: str = ""

    class Config:
        from_attributes = True