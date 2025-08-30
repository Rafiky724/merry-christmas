from fastapi import APIRouter

from app.controllers import auth, deseos, familias

router = APIRouter()

router.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
router.include_router(deseos.router, prefix="/api/deseos", tags=["Deseos"])
router.include_router(familias.router, prefix="/api/familias", tags=["Familias"])