from fastapi import APIRouter
from pydantic import BaseModel
from services.password_service import (
    generate_password,
    check_rules,
    check_strength
)

router = APIRouter()

class PasswordRequest(BaseModel):
    length: int = 12
    include_upper: int = 1
    include_lower: int = 1
    include_digits: int = 1
    include_special: int = 1

@router.post("/generate-password")
def generate_password_api(req: PasswordRequest):
    pwd = generate_password(
        length=req.length,
        include_upper=req.include_upper,
        include_lower=req.include_lower,
        include_digits=req.include_digits,
        include_special=req.include_special
    )

    if "Error" in pwd:
        return {"error": pwd}

    valid = check_rules(
        pwd,
        include_upper=req.include_upper,
        include_lower=req.include_lower,
        include_digits=req.include_digits
    )

    score, strength = check_strength(pwd)

    return {
        "password": pwd,
        "valid_rules": valid,
        "strength_score": score,
        "strength_label": strength
    }
