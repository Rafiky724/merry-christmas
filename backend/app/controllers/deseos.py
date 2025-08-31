from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.Deseo import Deseo, EstadoDeseo
from app.models.Usuario import Usuario
from app.schemas import DeseoCreate, DeseoOut
from typing import List

router = APIRouter()

# Crear deseo
@router.post("/", response_model=DeseoOut)
async def crear_deseo(
    deseo: DeseoCreate, 
    db: AsyncSession = Depends(get_db), 
    current_user: Usuario = Depends(get_current_user)
    ):
    
    if not current_user.id_familia:
        raise HTTPException(status_code=404, detail="Usuario no pertenece a ninguna familia")
    
    nuevo_deseo = Deseo(
        **deseo.model_dump(),
        id_usuario=current_user.id_usuario,
        id_familia=current_user.id_familia
    )
    db.add(nuevo_deseo)
    await db.commit()
    await db.refresh(nuevo_deseo)
    return nuevo_deseo

# Ver deseos de la familia
@router.get("/familia", response_model=List[DeseoOut])
async def ver_deseos_familia(
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    if not current_user.id_familia:
        raise HTTPException(status_code=404, detail="Usuario no pertenece a ninguna familia")
    
    result = await db.execute(
        select(Deseo).where(Deseo.id_familia == current_user.id_familia)
    )
    return result.scalars().all()

# Cambiar estado de un deseo (pendiente → comprado)
@router.patch("/{id_deseo}/estado", response_model=DeseoOut)
async def cambiar_estado(
    id_deseo: int, 
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    result = await db.execute(select(Deseo).where(Deseo.id_deseo == id_deseo))
    deseo = result.scalars().first()

    if not deseo:
        raise HTTPException(status_code=404, detail="Deseo no encontrado")

    # 🚨 Validar que pertenezca a la misma familia
    if deseo.id_familia != current_user.id_familia:
        raise HTTPException(status_code=403, detail="No tienes permiso para modificar este deseo")

    # 🚨 Validar que el usuario NO sea el creador del deseo
    if deseo.id_usuario == current_user.id_usuario:
        raise HTTPException(status_code=403, detail="No puedes cambiar el estado de tu propio deseo")

    # Actualizar estado
    deseo.estado = EstadoDeseo.comprado
    db.add(deseo)
    await db.commit()
    await db.refresh(deseo)

    return deseo

# Eliminar deseo propio
@router.delete("/{id_deseo}")
async def eliminar_deseo(
    id_deseo: int, 
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    result = await db.execute(select(Deseo).where(Deseo.id_deseo == id_deseo))
    deseo = result.scalars().first()

    if not deseo:
        raise HTTPException(status_code=404, detail="Deseo no encontrado")

    # 🚨 Validar que el deseo pertenezca al usuario logueado
    if deseo.id_usuario != current_user.id_usuario:
        raise HTTPException(status_code=403, detail="No puedes eliminar deseos de otros miembros")

    await db.delete(deseo)
    await db.commit()

    return {"msg": "Deseo eliminado correctamente"}
