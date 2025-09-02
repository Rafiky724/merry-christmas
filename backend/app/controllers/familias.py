import random, string
from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.Familia import Familia
from app.models.Usuario import Usuario
from app.schemas import FamiliaCreate, FamiliaOut

router = APIRouter()

def generar_codigo():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

# Crear familia
@router.post("/", response_model=FamiliaOut)
async def crear_familia(
    nombre: str = Form(...),  # Usamos Form(...) para recibir como parámetros de formulario
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    # Validar si el usuario ya pertenece a una familia
    if current_user.id_familia is not None:
        raise HTTPException(status_code=400, detail="Ya perteneces a una familia, no puedes crear otra.")

    # Generar el código para la nueva familia
    codigo = generar_codigo()

    # Crear la nueva familia con los datos recibidos
    nueva_familia = Familia(
        codigo=codigo,
        nombre=nombre,  # Aquí pasamos el nombre directamente desde el formulario
        creado_por=current_user.id_usuario
    )
    
    # Guardar en la base de datos
    db.add(nueva_familia)
    await db.commit()
    await db.refresh(nueva_familia)

    # Asociar al usuario con la nueva familia
    current_user.id_familia = nueva_familia.id_familia
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)

    return nueva_familia

# Unirse a familia por código
@router.post("/unirse/{codigo}")
async def unirse_familia(
    codigo: str, 
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    # Validar si el usuario ya pertenece a una familia
    if current_user.id_familia is not None:
        raise HTTPException(status_code=400, detail="Ya perteneces a una familia. Debes salir primero para unirte a otra.")

    result = await db.execute(select(Familia).where(Familia.codigo == codigo))
    familia = result.scalars().first()
    if not familia:
        raise HTTPException(status_code=404, detail="Código de familia no válido")
    
    current_user.id_familia = familia.id_familia
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)

    return {"msg": f"Te uniste a la familia {familia.nombre}"}

# Salir de una familia
@router.post("/salir")
async def salir_familia(
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    if current_user.id_familia is None:
        raise HTTPException(status_code=400, detail="No perteneces a ninguna familia.")

    current_user.id_familia = None
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)

    return {"msg": "Has salido de la familia exitosamente."}

# Verificar familia del usuario
@router.get("/mi-familia", response_model=dict)
async def obtener_mi_familia(
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    if current_user.id_familia is None:
        return {"tieneFamilia": False, "familia": None}

    result = await db.execute(select(Familia).where(Familia.id_familia == current_user.id_familia))
    familia = result.scalars().first()

    if not familia:
        return {"tieneFamilia": False, "familia": None}

    return {
        "tieneFamilia": True,
        "familia": {
            "id": familia.id_familia,
            "nombre": familia.nombre,
            "codigo": familia.codigo,
            "creado_por": familia.creado_por,
        },
    }