from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.core.security import create_access_token, hash_password, verify_password
from app.models.Usuario import Usuario
from app.schemas.usuario import UsuarioCreate, UsuarioOut

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -----------------------------
# Registro de usuario
# -----------------------------
@router.post("/register", response_model=UsuarioOut)
async def register(user: UsuarioCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Usuario).where(Usuario.correo == user.correo))
    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    
    new_user = Usuario(
        nombre=user.nombre,
        correo=user.correo,
        contrasena=hash_password(user.contrasena),
        id_familia=user.id_familia
    )
    
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

# -----------------------------
# Login de usuario
# -----------------------------
@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Usuario).where(Usuario.correo == form_data.username))
    user = result.scalars().first()
    if not user or not verify_password(form_data.password, user.contrasena):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")
    
    access_token = create_access_token(data={"sub": str(user.id_usuario)})
    return {"access_token": access_token, "token_type": "bearer"}