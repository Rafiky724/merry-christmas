from fastapi import APIRouter

from app.controllers import usuarios

router = APIRouter()

router.include_router(usuarios.router, prefix="/api", tags=["usuarios"])